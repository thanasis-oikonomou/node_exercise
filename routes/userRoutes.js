const express = require('express');
const router = express.Router();
const { usersController } = require('../controllers');

router.get('/users', usersController.getUsers);
router.get('/users/:userId/recent-contacts', usersController.getRecentContacts);

module.exports = router;
