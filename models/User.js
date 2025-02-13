const { DataTypes } = require("sequelize");
const mssql = require("../config/mssql"); // เชื่อมต่อกับ MSSQL
const mysql = require("../config/mysql"); // Connection MySQL

const User = mysql.define("User", { 
  name: DataTypes.STRING,
  email: DataTypes.STRING
}, {
  tableName: "users",
  timestamps: false
});

module.exports = User;

