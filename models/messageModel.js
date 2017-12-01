const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  user: String,
  message: String,
  created: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
