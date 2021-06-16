const express = require('express');
const userRoutes = require('./user');

const router = new express.Router()
router.use("/auth", userRoutes)


module.exports = router;