const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  user: String,
  message: String,
  created: { type: Date, default: Date.now },
  sentScore: Number,
  sentComp: Number,
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
