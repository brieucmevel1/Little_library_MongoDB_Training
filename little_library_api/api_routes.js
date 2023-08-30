const express = require('express');
const api_controller = require('./api_controler.js');
const router = express.Router();

//the routes are here to map the routes for
//the right functions depending on the request of the user

router.get('/users/:_id', api_controller.get_user_by_id);
router.post('/users', api_controller.create_user);
router.delete('/users/:_id', api_controller.delete_user_by_id);
router.put('/users/:_id', api_controller.update_user_by_id);

module.exports = router;
