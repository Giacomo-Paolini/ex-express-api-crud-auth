const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { checkSchema } = require('express-validator');
const user = require('../validations/user');

router.post('/register', checkSchema(user.register), authController.register);
router.post('/login', checkSchema(user.login), authController.login);

module.exports = router;