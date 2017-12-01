const express = require('express');
const { Message } = require('./models/index');

const app = express();

app.use(express.static('public'));

app.get('/messages', (req, res) => res.send('Hello World!'));

app.post('/messages', (req, res) => {
  const messageInst = { user: 'Brandon', message: 'Hello World' };
  Message.create(messageInst, (err, msg) => {
    if (err) throw err;
    return res.json(msg);
  });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
