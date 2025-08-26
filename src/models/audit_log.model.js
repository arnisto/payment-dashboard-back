const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const AuditLog = sequelize.define("AuditLog", {
  entity_type: DataTypes.STRING, // 'bill' or 'payment'
  entity_id: DataTypes.INTEGER,
  action: DataTypes.STRING, // 'create', 'update', 'delete'
  user_id: DataTypes.INTEGER,
  timestamp: DataTypes.DATE,
  details: DataTypes.JSON,
});

module.exports = AuditLog;
