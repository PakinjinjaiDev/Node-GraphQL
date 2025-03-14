# Node-GraphQL Project

## 📌 Overview
This project is a **GraphQL API** built with **Node.js** and **Express.js**, using **GraphQL-HTTP** for handling GraphQL queries. The API connects to multiple databases, including **MSSQL**, **MySQL**, and **PostgreSQL**.

## 🏗 Project Structure
```
NODE-GRAPHQL/
│── config/               # Database connection configurations
│   ├── mssql.js          # MSSQL connection
│   ├── mysql.js          # MySQL connection
│   ├── postgresql.js     # PostgreSQL connection
│
│── graphql/              # GraphQL schema and resolvers
│   │── resolvers/        # Resolver functions
│   │   ├── combinedQuery.js
│   │   ├── ibcbttQuery.js
│   │   ├── userMutations.js
│   │   ├── userQuery.js
│   │   ├── index.js      # Resolver entry point
│   │── schema.js         # GraphQL schema
│
│── middleware/           # Authentication and middleware
│   ├── basicAuth.js      # Basic authentication middleware
│   ├── loggingDB.js      # Logging middleware for debugging requests
│
│── models/               # Data models (Sequelize ORM)
│   ├── manageService.js  # ManageService Model
│   ├── User.js           # User Model
│
│── node_modules/         # Node.js dependencies (auto-generated)
│
│── routes/               # Application routes
│   ├── graphql.js        # GraphQL API route setup
│
│── .dockerignore         # Ignore files when building Docker image
│── .env                  # Environment variables (not included in the repo)
│── .gitignore            # Ignore unnecessary files in Git
│── docker-compose.yml    # Docker Compose configuration
│── DockerFile            # Docker image configuration
│── index.js              # Main entry point
│── package.json          # Dependencies and scripts
│── package-lock.json     # Lock file for npm dependencies
│── README.md             # Project documentation
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

