const express = require('express');
const router = express.Router();
const seedRoutes = require('./seedRoutes');
const userRoutes = require('./userRoutes');
const messageRoutes = require('./messageRoutes');

router.use('/', seedRoutes);
router.use('/', userRoutes);
router.use('/', messageRoutes);

module.exports = router;
