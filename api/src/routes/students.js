const { Router } = require("express");
const { Student, Room, Sibling } = require("../db.js");
const { verifyToken } = require("../middlewares/jwt.js");
const router = Router();

// Get all students
router.get("/", async (req, res) => {
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

// Add student
router.post("/", verifyToken, async (req, res) => {
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

// Get student by id
router.get("/:id", async (req, res) => {
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

// Edit student by id
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const studentId = req.params.id;
    const { name, age, gender, hasSibling, roomId } = req.body;

    const student = await Student.findOne({ where: { id: studentId } });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    if (roomId) {
      const room = await Room.findByPk(roomId);
      if (!room) {
        return res.status(404).json({ error: "Room not found" });
      }
    }

    await student.update({ name, age, gender, hasSibling, RoomId: roomId });
    res.status(200).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating student" });
  }
});

// Delete student by id
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findOne({ where: { id: studentId } });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    await student.destroy();
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting student" });
  }
});

module.exports = router;
