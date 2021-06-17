var express = require('express');
var router = express.Router();
const {signin, signup} = require('../controllers/user');

// const auth = require('../middlewares/auth')

// const upload = require('../middlewares/mutter')
/* GET users listing. */
router.post('/signin', signin)
router.post('/signup', signup)





module.exports = router;
