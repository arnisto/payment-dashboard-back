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
    await db.AuditLog.create({
      entity_type: "permission",
      entity_id: permission.id,
      action: "create",
      user_id,
      timestamp: new Date(),
      details: { user_id, section, can_read, can_write, can_delete },
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
    const before = permission.toJSON();
    await permission.update(req.body);
    await db.AuditLog.create({
      entity_type: "permission",
      entity_id: permission.id,
      action: "update",
      user_id: permission.user_id,
      timestamp: new Date(),
      details: { before, after: permission.toJSON() },
    });
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
    const snapshot = permission.toJSON();
    await permission.destroy();
    await db.AuditLog.create({
      entity_type: "permission",
      entity_id: permission.id,
      action: "delete",
      user_id: permission.user_id,
      timestamp: new Date(),
      details: snapshot,
    });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
