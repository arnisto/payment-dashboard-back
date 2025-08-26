const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const User = sequelize.define("User", {
  email: DataTypes.STRING,
  password_hash: DataTypes.STRING,
  role: DataTypes.STRING,
  parent_id: DataTypes.INTEGER,
});

module.exports = User;
