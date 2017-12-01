const { Message } = require('./../models/index');

const messageController = {};

messageController.getMessages = (req, res) => {
  Message.find({}, (err, messages) => {
    if (err) return res.status(500).json(err);
    return res.json(messages);
  });
};

messageController.getMessagesIO = (socket) => {
  Message.find({}, (err, messages) => {
    if (err) return socket.emit('exception', err);
    return socket.emit('all messages', JSON.stringify(messages));
  });
};

messageController.createMessage = (req, res) => {
  const messageInst = { user: req.body.user, message: req.body.message };
  Message.create(messageInst, (err, msg) => {
    if (err) return res.status(500).json(err);
    return res.json(msg);
  });
};

messageController.createMessageIO = (msgStr, io) => {
  const msg = JSON.parse(msgStr);
  const messageInst = { user: msg.user, message: msg.message };
  console.log(`Message Received: ${msg}`);
  Message.create(messageInst, (err, result) => {
    if (err) return io.emit('exception', err);
    console.log('Added Message to DB:', result);
    return io.emit('new message', JSON.stringify(result));
  });
};

module.exports = messageController;
