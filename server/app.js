require('dotenv').config();
const express = require('express');
const httpPre = require('http');
const path = require('path');
const socketIO = require('socket.io');
const messageController = require('./controllers/messageController');

const app = express();
const http = httpPre.Server(app, {
  serveClient: false,
});
const io = socketIO(http);
const activeUsers = [];

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, './../client/dist')));
app.use(express.json());

app.get('/messages', messageController.getMessages);
app.post('/messages', messageController.createMessage);

// User connects via web socket
io.on('connection', (socket) => {
  let user;
  console.log('a user connected');
  // Request username
  socket.emit('get user');
  // Add username when received
  socket.on('user', (res) => {
    user = res;
    console.log('user received', user);
    activeUsers.push(user);
    io.emit('active users', JSON.stringify(activeUsers));
  });
  // Send all messages via web socket
  messageController.getMessagesIO(socket);
  // When receive new message, create in database
  socket.on('new message', msg => messageController.createMessageIO(msg, io));
  // Log when user disconnects
  socket.on('disconnect', () => {
    console.log(`${user} disconnected`);
    const userIdx = activeUsers.indexOf(user);
    activeUsers.splice(userIdx, 1);
    console.log(`current users: ${activeUsers}`)
    io.emit('active users', JSON.stringify(activeUsers));
  });
});

http.listen(PORT, () => console.log(`SlackOff listening on port ${PORT}!`));
