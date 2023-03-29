const { Router } = require("express");
const jwt = require("jsonwebtoken");
const router = Router();

router.get("/", (req, res) => {
  res.status(200).send({ message: "Welcome to EduTracker" });
});

module.exports = router;
