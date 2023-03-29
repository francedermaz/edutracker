const { Router } = require('express');
const authRouter = require('./auth.js');
const roomRouter = require('./room.js');
const studentsRouter = require('./students.js');

const router = Router();

router.use('/auth', authRouter);
router.use('/rooms', roomRouter);
router.use('/students', studentsRouter);

module.exports = router;
