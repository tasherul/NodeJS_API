const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');


//handel income ger request /products
router.post('/signup', /* check authontication if use , */  UserController.Signup_user);

router.post('/login', /* check authontication if use , */  UserController.login_user);

router.post('/ids',UserController.token_to_data);

module.exports = router;