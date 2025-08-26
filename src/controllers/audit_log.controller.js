const db = require("../models");

exports.getAllLogs = async (req, res, next) => {
  try {
    const logs = await db.AuditLog.findAll();
    res.json(logs);
  } catch (err) {
    next(err);
  }
};

exports.getLogById = async (req, res, next) => {
  try {
    const log = await db.AuditLog.findByPk(req.params.id);
    if (!log) return res.status(404).json({ message: "Log not found" });
    res.json(log);
  } catch (err) {
    next(err);
  }
};

exports.getLogsByEntity = async (req, res, next) => {
  try {
    const { entity_type, entity_id } = req.params;
    const logs = await db.AuditLog.findAll({
      where: { entity_type, entity_id },
    });
    res.json(logs);
  } catch (err) {
    next(err);
  }
};

exports.getLogsByUser = async (req, res, next) => {
  try {
    const logs = await db.AuditLog.findAll({
      where: { user_id: req.params.user_id },
    });
    res.json(logs);
  } catch (err) {
    next(err);
  }
};
