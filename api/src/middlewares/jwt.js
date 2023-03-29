const jwt = require("jsonwebtoken");
const { Admin } = require("../db.js");

const createInitialAdmin = async () => {
  const admin = await Admin.findOne({ where: { email: "admin@example.com" } });

  if (!admin) {
    await Admin.create({
      email: "admin@example.com",
      password: "password",
      enabled: true,
    });
  }
};

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Authorization token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.adminEmail = decoded.email;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid authorization token" });
  }
}

module.exports = { verifyToken, createInitialAdmin };
