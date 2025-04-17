# Node-GraphQL Project

## 📌 Overview
This project is a **GraphQL API** built with **Node.js** and **Express.js**, using **GraphQL-HTTP** for handling GraphQL queries. The API connects to multiple databases, including **MSSQL**, **MySQL**, and **PostgreSQL**.

## 🏗 Project Structure EN
```
NODE-GRAPHQL/
│
├── config/                      # ⚙️ Database connection configurations
│
├── graphql/                     # 🌐 GraphQL schema and resolvers
│   ├── resolvers/               # 💡 Resolver functions (Query / Mutation logic)
│   │
│   ├── typeDefs/                # 🧱 GraphQL schema definitions (SDL)
│   │   └── index.js             # Merge all typeDefs using `@graphql-tools/merge`
│   │
│   ├── index.js                 # Merge all resolvers using lodash.merge
│   └── schema.js                # Create executable schema (typeDefs + resolvers)
│
├── middleware/                  # 🛡️ Custom middleware functions
│
├── models/                      # 🗃️ Sequelize models
│
├── routes/                      # 🚏 Express route definitions
│   └── graphql.js               # Setup for GraphQL API endpoint
│
├── .dockerignore                # Ignore files/folders for Docker builds
├── .env                         # Environment variables (not committed)
├── .gitignore                   # Ignore unnecessary files from Git
├── docker-compose.yml           # Docker Compose setup
├── Dockerfile                   # Docker image build instructions
├── index.js                     # 🏁 Entry point to start the Node.js server
├── package.json                 # Project metadata, scripts & dependencies
├── package-lock.json            # Exact dependency versions for reproducibility
└── README.md                    # 📘 Project documentation (this file!)
```
## 🏗 Project Structure TH
```
NODE-GRAPHQL/
│
├── config/                      # ⚙️ ไฟล์เชื่อมต่อฐานข้อมูล (Database Connections)
│
├── graphql/                     # 🌐 โฟลเดอร์หลักของ GraphQL API
│   ├── resolvers/               # 💡 กลุ่มฟังก์ชัน Resolver (Query, Mutation)
│   │
│   ├── typeDefs/                # 🧱 โครงสร้าง Schema แบบแยกไฟล์ (SDL - Schema Definition Language)
│   │   └── index.js             # รวมทุก typeDef ด้วย `@graphql-tools/merge`
│   │
│   ├── index.js                 # รวมทุก resolver ด้วย `lodash.merge`
│   └── schema.js                # สร้าง GraphQL Executable Schema ด้วย `makeExecutableSchema`
│
├── middleware/                  # 🛡️ Middleware สำหรับควบคุมการเข้าถึงและการใช้งาน
│
├── models/                      # 🗃️ Sequelize Models (สำหรับ ORM)
│
├── routes/                      # 🚏 Routing สำหรับ API (Express)
│   └── graphql.js               # เส้นทางหลักสำหรับ GraphQL Endpoint
│
├── Dockerfile                   # 🔧 คำสั่งสร้าง Docker Image สำหรับโปรเจกต์
├── docker-compose.yml           # 🐳 รวบรวม Service ต่าง ๆ ใน Docker
├── .env                         # 🔐 เก็บ Environment Variables (เช่น DB Credentials)
├── index.js                     # 🏁 จุดเริ่มต้นของแอป (Server Entry Point)
├── package.json                 # ข้อมูลและ dependency ของโปรเจกต์
└── README.md                    # 📘 เอกสารประกอบโปรเจกต์ (ที่คุณกำลังอ่านอยู่นี่!)
```

## 🚀 Getting Started
### 1️⃣ **Clone the Repository**
```sh
git clone https://github.com/PakinjinjaiDev/Node-GraphQL.git
cd Node-GraphQL
```

### 2️⃣ **Install Dependencies**
```sh
npm install
```

### 3️⃣ **Set Up Environment Variables**
Create a `.env` file in the root directory:
```sh
MSSQL_HOST=host.docker.internal
MSSQL_PORT=1433
MSSQL_USER=sa
MSSQL_PASSWORD=YourStrongPassword
MSSQL_DATABASE=your_database
GRAPHQL_PORT=4000
```
### 4️⃣ **Run the Project Locally**
```sh
npm start
```
This will start the GraphQL server at `http://localhost:4000/graphql`.

---

## 🐳 Running with Docker
### **1️⃣ Build and Run the Docker Container**
```sh
docker-compose up --build
```
This will start the GraphQL server inside a Docker container.

### **2️⃣ Access the GraphQL Playground**
Once the server is running, open your browser and go to:
```
http://localhost:4000/graphql
```

---

## 🛠 API Endpoints
### **GraphQL Endpoint**
```
http://localhost:4000/graphql
```
You can send queries using tools like **GraphQL Playground**, **Postman**, or **cURL**.

### **Example Query**
```graphql
query {
  users {
    id
    name
    email
  }
}
```

### **Example Mutation**
```graphql
mutation {
  createUser(name: "John Doe", email: "john@example.com") {
    id
    name
    email
  }
}
```

---

## 📌 Docker Compose Services
### **docker-compose.yml** Overview:
- **graphql-server** → Runs the Node.js GraphQL API
- **MSSQL** → External database running on `host.docker.internal:1433`

If you don’t have an MSSQL container running, you can start one with:
```sh
docker run -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=YourStrongPassword' \
  -p 1433:1433 --name mssql -d mcr.microsoft.com/mssql/server:2022-latest
```

---

## 🛠 Troubleshooting
### **1️⃣ Error: `Failed to connect to MSSQL`**
- Ensure the database container is running: `docker ps`
- Verify your `.env` settings match the actual database credentials
- Check if the database is accessible from your machine

### **2️⃣ `nodemon` Not Restarting Automatically**
Try manually restarting:
```sh
npm install -g nodemon
npm start
```

### **3️⃣ Port Conflicts**
If port `4000` is in use, change `GRAPHQL_PORT` in `.env` and update `docker-compose.yml`:
```yaml
ports:
  - "5000:4000"
```

---

## 🔥 Author
Created by **PakinjinjaiDev** 🚀

Feel free to contribute, report issues, or suggest improvements!

