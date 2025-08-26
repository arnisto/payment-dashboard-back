const sequelize = require("../config/sequelize");

const User = require("./user.model");
const Permission = require("./permission.model");
const Bill = require("./bill.model");
const Payment = require("./payment.model");
const AuditLog = require("./audit_log.model");

const db = {
  sequelize,
  User,
  Permission,
  Bill,
  Payment,
  AuditLog,
};

module.exports = db;
