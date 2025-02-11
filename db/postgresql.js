const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.PG_DB, process.env.PG_USER, process.env.PG_PASSWORD, {
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,  // 👉 เพิ่มพอร์ตที่อ้างอิงจาก .env
  dialect: "postgres"
});

sequelize.authenticate()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch(err => console.error("❌ PostgreSQL connection error:", err));

module.exports = sequelize;
