const { Router } = require('express');
const authRouter = require('./auth.js');

const router = Router();

router.use('/', authRouter);

module.exports = router;
