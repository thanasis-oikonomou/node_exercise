const express = require('express');
const router = express.Router();
const { seedsController } = require('../controllers');

router.post('/feedDB', seedsController.feedDatabase);

module.exports = router;
