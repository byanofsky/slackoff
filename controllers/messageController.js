const { Message } = require('./../models/index');

const messageController = {};

messageController.createMessage = (req, res) => {
  const messageInst = { user: req.body.user, message: req.body.message };
  Message.create(messageInst, (err, msg) => {
    if (err) throw err;
    return res.json(msg);
  });
};

module.exports = messageController;
