const express = require('express');
const passportService = require('../config/passport');
const authRouter = require('./auth');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ success: true, title: 'REST API Interface' });
});

router.use('/auth', authRouter);

module.exports = router;
