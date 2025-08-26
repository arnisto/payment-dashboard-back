const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Permission = sequelize.define("Permission", {
  user_id: DataTypes.INTEGER,
  section: DataTypes.STRING,
  can_read: DataTypes.BOOLEAN,
  can_write: DataTypes.BOOLEAN,
  can_delete: DataTypes.BOOLEAN,
});

module.exports = Permission;
