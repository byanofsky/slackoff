const { Message } = require('./../models/index');
const sentiment = require('sentiment');

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
  messageController.getTotalSent(socket);
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
  const sent = sentiment(msg.message);
  const messageInst = {
    user: msg.user,
    message: msg.message,
    sentScore: sent.score,
    sentComp: sent.comparative,
  };
  console.log(`Message Received: ${msg}`);
  Message.create(messageInst, (err, result) => {
    if (err) return io.emit('exception', err);
    console.log('Added Message to DB:', result);
    messageController.sendTotalToAll(io);
    return io.emit('new message', JSON.stringify(result));
  });
};

messageController.getTotalSent = (socket) => {
  Message.aggregate(
    { $match: {} },
    {
      $group: {
        _id: null,
        sentScore: {
          $sum: '$sentScore',
        },
        sentComp: {
          $sum: '$sentComp',
        },
      },
    }, (err, result) => {
      if (err) return socket.emit('exception', err);
      console.log(result);
      return socket.emit('sent score', JSON.stringify(result[0].sentComp));
    },
  );
};

messageController.sendTotalToAll = (io) => {
  Message.aggregate(
    { $match: {} },
    {
      $group: {
        _id: null,
        sentScore: {
          $sum: '$sentScore',
        },
        sentComp: {
          $sum: '$sentComp',
        },
      },
    }, (err, result) => {
      if (err) console.log(err);
      console.log(result);
      return io.emit('sent score', JSON.stringify(result[0].sentComp));
    },
  );
};

module.exports = messageController;
