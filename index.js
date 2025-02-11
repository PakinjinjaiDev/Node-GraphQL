require('dotenv').config(); 
const express = require("express");
const { buildSchema } = require("graphql");
const { createHandler } = require("graphql-http/lib/use/express");
const User = require("./models/User"); // เพิ่มการ import User จากโมเดล

const app = express();
app.use(express.json());

// Schema และ resolver ตามที่คุณกำหนดไว้
const schema = buildSchema(`
  type Query {
    message: String
    users: [User]
  }

  type User {
    id: ID
    name: String
    email: String
  }
`);

const root = {
  message: () => "Hello, GraphQL with graphql-http!",
  users: async () => {
    try {
      const mssqlUsers = await User.mssql.findAll();
      return [...mssqlUsers]; 
    } catch (error) {
      console.error("❌ Error fetching users:", error);
      return [];
    }
  }
};

// ใช้ graphql-http เป็น middleware
app.all("/graphql", createHandler({
  schema,
  rootValue: root
}));
// เส้นทางให้ข้อมูลวิธีการทดสอบผ่าน Postman หรือ Apollo Studio Explorer
app.get("/docs", (req, res) => {
  res.send(`
    GraphQL API Documentation
    You can test the GraphQL API using the following tools:
    1. Postman
      1. Set the request type to POST
      2. Set the URL to http://localhost:4000/graphql
      3. In the Body section, choose raw and select GraphQL
      4. Enter your GraphQL query (e.g., query { users { id name } }
    2. Apollo Studio Explorer
      1. Go to Apollo Studio Explorer
      2. Set the endpoint URL to http://localhost:4000/graphql
      3. Write your GraphQL query and execute it.
  `);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}/graphql`);
  console.log(`📜 API documentation available at http://localhost:${PORT}/docs`);
});
