const mongoose = require('mongoose');

const DetailsSchema = new mongoose.Schema({
  name: String,
  age: String,
  dob: String,
  firstname: String,
  lastname: String,
  more: {
    address_line1: String,
    address_line2: String,
    address_line3: String,
    phone: String,
  },
});

mongoose.model('details', DetailsSchema);
