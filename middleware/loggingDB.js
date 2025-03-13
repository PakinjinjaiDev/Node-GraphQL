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
    const details = query
    console.log("📌 IP:", ip);
    console.log("🖥 User Agent:", userAgent);
    console.log("🔑 Headers:", headers);
    console.log("📌 Type:", type);
    console.log("🔍 Query Details:", details);
    console.log("📦 Variables:", variables);
    // ✅ ดักจับ response โดย override res.end
    let responseBody = "";
    const originalEnd = res.end;
    res.end = function (chunk, encoding) {
      if (chunk) responseBody += chunk.toString(); // เก็บ response data
      originalEnd.apply(res, arguments); // ส่ง response กลับไป
    };
    res.on("finish", () => {
      const endTime = process.hrtime(startTime);
      const responseTime = (endTime[0] * 1000 + endTime[1] / 1e6).toFixed(2) + " ms";
      let status = "SUCCESS";
      try {
        const responseData = JSON.parse(responseBody);
        if (responseData.errors) status = "ERROR";
      } catch (err) {
        status = "ERROR"; // JSON parse ไม่ได้ ถือว่าล้มเหลว
      }
      console.log("⏳ Response Time:", responseTime);
      console.log("✅ Status:", status);
    });
  }
  next();
};

module.exports = logGraphQLRequest;
