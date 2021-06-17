const mongoose = require('./../database')
const Schema = mongoose.Schema
const courseSchema = new Schema({
  Course: {
    type: String,
    required: true,
  },
  Votes: {
    type: String,
    required: true,
  },
  'Course Link': {
    type: String,
    required: true,
  },
  Author: {
    type: String,
    default: '',
  },
  'Author Link': {
    type: String,
    default: '',
  },
  'Hackr Link': {
    type: String,
    default: '',
  },
  "Course Cost": {
    type: String,
    default: '',
  },
 "Student Type": {
    type: String,
    default: '',
  },
  "Category": {
    type: String
  }
})

module.exports = mongoose.model('course', courseSchema);
