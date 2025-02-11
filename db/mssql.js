const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.MSSQL_DB, process.env.MSSQL_USER, process.env.MSSQL_PASSWORD, {
  dialect: "mssql",
  server: process.env.MSSQL_HOST,  // ✅ เปลี่ยนจาก host → server
  port: process.env.MSSQL_PORT,   // ✅ ใช้ port ตาม .env
  dialectOptions: {
    options: {
      encrypt: true,   // สำคัญสำหรับ Azure SQL
      trustServerCertificate: true // ใช้ true ถ้าเป็น Local
    }
  }
});

sequelize.authenticate()
  .then(() => console.log("✅ Connected to SQL Server"))
  .catch(err => console.error("❌ SQL Server connection error:", err));

module.exports = sequelize;
