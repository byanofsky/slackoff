const express = require('express');
const httpPre = require('http');
const socketIO = require('socket.io');
const messageController = require('./controllers/messageController');

const app = express();
const http = httpPre.Server(app);
const io = socketIO(http);

app.use(express.static('public'));
app.use(express.json());

app.get('/messages', messageController.getMessages);

app.post('/messages', messageController.createMessage);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(3000, () => console.log('Example app listening on port 3000!'));
