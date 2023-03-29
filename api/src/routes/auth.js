const { Router } = require("express");
const { Student, Room, Sibling } = require("../db.js");
const jwt = require("jsonwebtoken");
const router = Router();

router.get("/", (req, res) => {
  res.status(200).send({ success: "Welcome to EduTracker" });
});

router.get("/students", async (req, res) => {
  try {
    const students = await Student.findAll({
      include: [
        {
          model: Room,
          attributes: ["id", "name"],
        },
        {
          model: Sibling,
          as: "siblings",
          attributes: ["id", "name"],
        },
      ],
      attributes: { exclude: ["roomId"] },
    });
    res.status(200).json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error getting students" });
  }
});

router.get("/rooms", async (req, res) => {
  try {
    const rooms = await Room.findAll({
      include: [
        {
          model: Student,
          attributes: ["id", "name"],
        },
      ],
    });
    res.status(200).json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error getting rooms" });
  }
});

module.exports = router;
