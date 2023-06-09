const { Router } = require("express");
const { Student, Room, Sibling } = require("../db.js");
const { verifyToken } = require("../middlewares/jwt.js");
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

// Get room by id
router.get("/:id", async (req, res) => {
  try {
    const roomId = req.params.id;
    const room = await Room.findOne({
      where: { id: roomId },
      include: [
        {
          model: Student,
          attributes: ["id", "name", "age", "gender", "hasSibling", "siblings"],
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
router.post("/", verifyToken, async (req, res) => {
  try {
    const { name, courseCode, teacher } = req.body;
    const room = await Room.create({ name, courseCode, teacher });
    res.status(201).json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating room" });
  }
});

// Edit room by id
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const { name, teacher } = req.body;
    const room = await Room.findOne({ where: { id: id } });
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

// Delete room by ID
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    const room = await Room.findByPk(id);
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
