const { DataTypes } = require("sequelize");
const mssql = require("../db/mssql"); // เชื่อมต่อกับ MSSQL

const User = mssql.define("User", { 
  name: DataTypes.STRING,
  email: DataTypes.STRING
}, {
  tableName: "users",
  timestamps: false
});

module.exports = User;

