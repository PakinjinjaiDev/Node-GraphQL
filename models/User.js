const { DataTypes } = require("sequelize");
const mysql = require("../config/mysql"); // Connection MySQL

const User = mysql.define("User", { 
  name: DataTypes.STRING,
  email: DataTypes.STRING
}, {
  tableName: "users",
  timestamps: false
});

module.exports = User;

