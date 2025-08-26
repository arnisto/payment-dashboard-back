const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Bill = sequelize.define("Bill", {
  client_name: DataTypes.STRING,
  client_email: DataTypes.STRING,
  amount_total: DataTypes.FLOAT,
  currency: DataTypes.STRING,
  status: DataTypes.STRING, // 'pending', 'partialy_paid', 'paid', 'canceled'
});

module.exports = Bill;
