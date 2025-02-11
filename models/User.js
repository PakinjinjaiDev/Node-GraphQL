const { DataTypes } = require("sequelize");
const mssql = require("../db/mssql"); // เชื่อมต่อกับ MSSQL

// สร้างโมเดลสำหรับ MSSQL
const User = {
  mssql: mssql.define("User", { 
    name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    tableName: "users",  // ตั้งชื่อตารางที่ต้องการใช้งาน
    timestamps: false     // ถ้าไม่ต้องการให้มีการเก็บเวลาสร้างหรืออัปเดต
  })
};

module.exports = User;
