const express = require('express');
const {registerUser,loginUser, getUser} = require('../controllers');
const isUser  = require('../middlewares/isUser');
const {validateRegister, validateLogin} = require('../middlewares/validators');

const router = new express.Router();
router.post('/register', validateRegister, registerUser);
router.post('/login', validateLogin, loginUser);
router.get('/me', isUser, getUser);


module.exports = router;
