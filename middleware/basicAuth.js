const basicAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith("Basic ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  
    // Decode Base64 username:password
    const base64Credentials = authHeader.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString("utf8");
    const [username, password] = credentials.split(":");
  
    // ตรวจสอบ username และ password
    if (username !== process.env.BASIC_AUTH_USER || password !== process.env.BASIC_AUTH_PASS) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
  
    next();
  };
  
  module.exports = basicAuth;
  