const { Router } = require("express");
const { Admin } = require("../db.js");
const jwt = require("jsonwebtoken");
const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ where: { email } });
  if (!admin || admin.password !== password) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
});

module.exports = router;
