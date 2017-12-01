require('dotenv').config();
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

// User connects via web socket
io.on('connection', (socket) => {
  console.log('a user connected');
  // Send all messages via web socket
  messageController.getMessagesIO(socket);
  // When receive new message, create in database
  socket.on('new message', msg => messageController.createMessageIO(msg, io));
  // Log when user disconnects
  socket.on('disconnect', () => console.log('user disconnected'));
});

http.listen(3000, () => console.log('Example app listening on port 3000!'));
