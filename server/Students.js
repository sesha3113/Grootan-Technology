const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: String,
  email: String,
  picture: String,
  password: String,
  phone: String,
  section: String,
  batch: String,
  department: String,
  rollnum: String,
});

mongoose.model('students', StudentSchema);
