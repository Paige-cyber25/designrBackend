var express = require('express')
var routerCourse = express.Router()
const courseController  = require('../controllers/course.js')
const auth = require('../middlewares/auth.js')

routerCourse.get('/courses', auth,  courseController.courseModel)

module.exports = routerCourse;
