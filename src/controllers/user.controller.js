const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendUserCredentials } = require("../services/email.service");

/**
 * Login a user and return a JWT token
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 */
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await db.User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      token: jwt.sign(
        { id: user.id, role: user.role, email: user.email },
        process.env.JWT_SECRET || "dev_secret",
        { expiresIn: "2h" }
      ),
      user: { id: user.id, email: user.email, role: user.role },
    });
  } catch (err) {
    next(err);
  }
};

/** Get all users */
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await db.User.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

/** Get user by ID */
exports.getUserById = async (req, res, next) => {
  try {
    const user = await db.User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

/** Create user */
exports.createUser = async (req, res, next) => {
  try {
    const { email, password, role, parent_id } = req.body;
    const password_hash = await bcrypt.hash(password, 10);

    const user = await db.User.create({
      email,
      password_hash,
      role,
      parent_id,
    });
    await sendUserCredentials({
      email,
      password,
      role,
      lang: req.body.lang || "fr",
    });

    await db.AuditLog.create({
      entity_type: "user",
      entity_id: user.id,
      action: "create",
      user_id: user.id,
      timestamp: new Date(),
      details: { email, role, parent_id },
    });
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

/** Update user */
exports.updateUser = async (req, res, next) => {
  try {
    const user = await db.User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const updates = { ...req.body };
    if (updates.password) {
      updates.password_hash = await bcrypt.hash(updates.password, 10);
      delete updates.password;
    }

    const before = user.toJSON();
    await user.update(updates);

    await sendUserCredentials({
      email: user.email,
      password: updates.password || user.password_hash,
      role: user.role,
      lang: req.body.lang || "fr",
    });
    await db.AuditLog.create({
      entity_type: "user",
      entity_id: user.id,
      action: "update",
      user_id: user.id,
      timestamp: new Date(),
      details: { before, after: user.toJSON() },
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

/** Delete user */
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await db.User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const snapshot = user.toJSON();
    await user.destroy();
    await db.AuditLog.create({
      entity_type: "user",
      entity_id: user.id,
      action: "delete",
      user_id: user.id,
      timestamp: new Date(),
      details: snapshot,
    });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

/** Admin-code protected password reset (no auth required) */
exports.resetPassword = async (req, res, next) => {
  try {
    const { email, newPassword, adminCode } = req.body;
    const expected = process.env.RESET_ADMIN_CODE || "DEV_RESET_CODE";
    if (!adminCode || adminCode !== expected) {
      return res.status(403).json({ message: "Invalid admin code" });
    }
    const user = await db.User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });
    const password_hash = await bcrypt.hash(newPassword, 10);
    await user.update({ password_hash });
    res.json({ message: "Password reset successful" });
  } catch (err) {
    next(err);
  }
};
