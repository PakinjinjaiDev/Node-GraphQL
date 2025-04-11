require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const graphqlHandler = require("./routes/graphql");
const basicAuth = require("./middleware/basicAuth"); // ✅ Import Middleware
const logGraphQLRequest = require("./middleware/loggingDB");

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(logGraphQLRequest);

// GraphQL API
app.all("/bi-team", basicAuth, graphqlHandler);
// console.log("🔍 ENV VARIABLES:", process.env);


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
  console.log(`🚀 Server running on http://localhost:${PORT}/bi-team`);
  console.log(`📜 API documentation available at http://localhost:${PORT}/docs`);
});
