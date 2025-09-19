
const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  course_id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  instructor: {
    type: String,
  },
  duration: {
    type: String,
  },
});

module.exports = mongoose.model('Course', CourseSchema);
