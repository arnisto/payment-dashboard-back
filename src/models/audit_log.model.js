const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const AuditLog = sequelize.define("AuditLog", {
  entity_type: DataTypes.STRING, // 'bill' or 'payment'
  entity_id: DataTypes.INTEGER,
  action: DataTypes.STRING, // 'create', 'update', 'delete'
  timestamp: DataTypes.DATE,
});

module.exports = AuditLog;
