const db = require("../models");
const bcrypt = require("bcrypt");

// 🔐 Login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await db.User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

// 👤 Get all users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await db.User.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// 👤 Get user by ID
exports.getUserById = async (req, res, next) => {
  try {
    const user = await db.User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// ➕ Create user
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

    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

// 🔄 Update user
exports.updateUser = async (req, res, next) => {
  try {
    const user = await db.User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const updates = { ...req.body };
    if (updates.password) {
      updates.password_hash = await bcrypt.hash(updates.password, 10);
      delete updates.password;
    }

    await user.update(updates);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// ❌ Delete user
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await db.User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
