const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  message: String,
  createdAt: Date
});

module.exports = mongoose.model('Message', MessageSchema);
