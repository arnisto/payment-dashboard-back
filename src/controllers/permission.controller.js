const db = require("../models");

exports.getAllPermissions = async (req, res, next) => {
  try {
    const permissions = await db.Permission.findAll();
    res.json(permissions);
  } catch (err) {
    next(err);
  }
};

exports.getPermissionById = async (req, res, next) => {
  try {
    const permission = await db.Permission.findByPk(req.params.id);
    if (!permission)
      return res.status(404).json({ message: "Permission not found" });
    res.json(permission);
  } catch (err) {
    next(err);
  }
};

exports.createPermission = async (req, res, next) => {
  try {
    const { user_id, section, can_read, can_write, can_delete } = req.body;
    const permission = await db.Permission.create({
      user_id,
      section,
      can_read,
      can_write,
      can_delete,
    });
    res.status(201).json(permission);
  } catch (err) {
    next(err);
  }
};

exports.updatePermission = async (req, res, next) => {
  try {
    const permission = await db.Permission.findByPk(req.params.id);
    if (!permission)
      return res.status(404).json({ message: "Permission not found" });
    await permission.update(req.body);
    res.json(permission);
  } catch (err) {
    next(err);
  }
};

exports.deletePermission = async (req, res, next) => {
  try {
    const permission = await db.Permission.findByPk(req.params.id);
    if (!permission)
      return res.status(404).json({ message: "Permission not found" });
    await permission.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
