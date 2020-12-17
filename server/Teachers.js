const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  picture: String,
  password: String,
  batch: String,
  department: String,
  section: String,
});

mongoose.model('Teachers', TeacherSchema);
