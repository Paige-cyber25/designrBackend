const express = require('express');
const {registerUser,loginUser} = require('../controllers');
const {validateRegister, validateLogin} = require('../middlewares/validators');

const router = new express.Router();
router.post('/register', validateRegister, registerUser);
router.post('/login', validateLogin.apply, loginUser)


module.exports = router;
