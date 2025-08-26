const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Payment = sequelize.define("Payment", {
  amount: DataTypes.FLOAT,
  method: DataTypes.STRING, // 'CB', 'virement', etc.
  payment_date: DataTypes.DATE,
});

module.exports = Payment;
