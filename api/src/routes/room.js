const { Router } = require("express");
const { Student, Room, Sibling } = require("../db.js");
const router = Router();

// Get all rooms
router.get("/", async (req, res) => {
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

// Get room by courseCode
router.get("/:courseCode", async (req, res) => {
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

// Add room
router.post("/", async (req, res) => {
  try {
    const { name, courseCode, teacher } = req.body;
    const room = await Room.create({ name, courseCode, teacher });
    res.status(201).json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating room" });
  }
});

// Edit room by courseCode
router.put("/:courseCode", async (req, res) => {
  try {
    const courseCode = req.params.courseCode;
    const { name, teacher } = req.body;
    const room = await Room.findOne({ where: { courseCode: courseCode } });
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }
    await room.update({ name, teacher });
    res.status(200).json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating room" });
  }
});

// Delete room by courseCode
router.delete("/:courseCode", async (req, res) => {
  try {
    const { courseCode } = req.params;

    const room = await Room.findOne({ where: { courseCode } });
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    await Student.destroy({ where: { RoomId: room.id } });
    await room.destroy();

    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting room" });
  }
});

module.exports = router;