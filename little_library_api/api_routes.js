const express = require('express');
const api_controller = require('./api_controler.js');
const router = express.Router();

router.get('/users', api_controller.get_users);
router.get('/users/:username', api_controller.get_user_by_username);
router.post('/users', api_controller.create_user);

module.exports = router;
