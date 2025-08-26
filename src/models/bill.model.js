const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Bill = sequelize.define("Bill", {
  client_name: DataTypes.STRING,
  client_email: DataTypes.STRING,
  amount_total: DataTypes.FLOAT,
  currency: DataTypes.STRING,
  status: DataTypes.STRING, // 'pending', 'partialy_paid', 'paid', 'canceled'
});

Bill.associate = (models) => {
  Bill.hasMany(models.Payment, {
    foreignKey: "bill_id",
    as: "payments",
  });
};

module.exports = Bill;
