const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: String,
  dob: String,
  address: String,
  phone: String,
  state: String,
  zip: String,
  email: String,
  gender: String,
  userType: String,
});

module.exports = mongoose.model('User', UserSchema);
