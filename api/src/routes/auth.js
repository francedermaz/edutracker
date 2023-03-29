const { Router } = require("express");
const { User } = require("../db.js");
const jwt = require("jsonwebtoken");
const router = Router();

router.get("/", (req, res) => {
  res.status(200).send({ success: "Welcome to EduTracker" });
});

module.exports = router;
