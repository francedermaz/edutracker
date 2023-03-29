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

router.post("/students", async (req, res) => {
  try {
    const { name, age, gender, hasSibling, courseCode } = req.body;
    const room = await Room.findOne({ where: { courseCode: courseCode } });
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }
    const student = await Student.create({
      name,
      age,
      gender,
      hasSibling,
      RoomId: room.id,
    });
    res.status(201).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating student" });
  }
});

router.get("/students/:id", async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findOne({
      where: { id: studentId },
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
      attributes: { exclude: ["createdAt", "updatedAt", "RoomId"] },
    });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error getting student" });
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

router.get("/rooms/:courseCode", async (req, res) => {
  try {
    const courseCode = req.params.courseCode;
    const room = await Room.findOne({
      where: { courseCode: courseCode },
      include: [
        {
          model: Student,
          attributes: ["id", "name", "age", "gender", "hasSibling"],
          include: [
            {
              model: Sibling,
              as: "siblings",
              attributes: ["id", "name"],
            },
          ],
        },
      ],
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }
    res.status(200).json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error getting room" });
  }
});

router.post("/rooms", async (req, res) => {
  try {
    const { name, courseCode, teacher } = req.body;
    const room = await Room.create({ name, courseCode, teacher });
    res.status(201).json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating room" });
  }
});

module.exports = router;
