

const mongoose = require('mongoose');

const EmployerDetailsSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
  companyAddress: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  }
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  resume: {
    type: String
  },
  employerDetails: EmployerDetailsSchema
});

module.exports = mongoose.model('User', UserSchema);
