const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Payment = sequelize.define("Payment", {
  amount: DataTypes.FLOAT,
  method: DataTypes.STRING, // 'CB', 'virement', etc.
  payment_date: DataTypes.DATE,
});

Payment.associate = (models) => {
  Payment.belongsTo(models.Bill, {
    foreignKey: "bill_id",
    as: "bill",
  });
};

module.exports = Payment;
