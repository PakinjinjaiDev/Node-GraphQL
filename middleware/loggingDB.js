const mssql = require("../config/mssql");

const logGraphQLRequest = async (req, res, next) => {
  if (req.method === "POST" && req.url === "/bi-team") {
    const startTime = process.hrtime();
    const { query, variables } = req.body;
    const ip = req.ip;
    const userAgent = req.headers["user-agent"];
    const headers = req.headers["authorization"] ? "Have Authorization" : "No Authorization";
    const trimmedQuery = query.trim().toLowerCase();
    const isMutation = trimmedQuery.startsWith("mutation");
    const type = isMutation ? "MUTATION" : "QUERY";
    const details = query;
    // ✅ แปลง variables ให้เป็นเฉพาะคีย์ หรือ null
    const variablesKeys = variables && typeof variables === "object" 
      ? Object.keys(variables).join(", ") // ดึงเฉพาะคีย์
      : "No variables"; // ถ้าไม่มี variables ให้เป็น message 
    console.log("📌 IP:", ip);
    console.log("🖥 User Agent:", userAgent);
    console.log("🔑 Headers:", headers);
    console.log("📌 Type:", type);
    console.log("🔍 Query Details:", details);
    console.log("📦 Variables:", variablesKeys);
    // ✅ ดักจับ response โดย override res.end
    let responseBody = "";
    const originalEnd = res.end;
    res.end = function (chunk, encoding) {
      if (chunk) responseBody += chunk.toString(); // เก็บ response data
      originalEnd.apply(res, arguments); // ส่ง response กลับไป
    };
    res.on("finish", async () => {
      const endTime = process.hrtime(startTime);
      const responseTime =
        (endTime[0] * 1000 + endTime[1] / 1e6).toFixed(2) + " ms";
      let status = "SUCCESS";
      let message = "No error occurred";
      try {
        const responseData = JSON.parse(responseBody);
        if (responseData.errors) {
          status = "ERROR";
          // ✅ ตรวจสอบว่า responseData.errors เป็น array และดึงข้อความ error ออกมา
          if (Array.isArray(responseData.errors)) {
            message = responseData.errors.map((err) => err.message).join(" | ");
          } else {
            message = "Unknown GraphQL Error";
          }
        }
        console.log("✉️ Message:", message);
      } catch (err) {
        status = "ERROR"; // JSON parse ไม่ได้ ถือว่าล้มเหลว
      }
      try {
        await mssql.query(`
          insert into ${
            process.env.GRPAHQL_LOG
          } ( ip, user_agent, header, type, status, detail, message, variables, response_time)
          values ('${ip}', '${userAgent}', '${headers}', '${type}', '${status}', '${details}', '${message}', '${variablesKeys}', '${responseTime}')
        `);
        console.log("✅ GraphQL request logged to database");
      } catch (e) {
        console.error("❌ Failed to log GraphQL request:", e);
      }
      console.log("⏳ Response Time:", responseTime);
      console.log("✅ Status:", status);
    });
  }
  next();
};

module.exports = logGraphQLRequest;
