const express = require('express');
const httpPre = require('http');
const socket = require('socket.io');
const messageController = require('./controllers/messageController');

const app = express();
const http = httpPre.Server(app);
const io = socket(http);

app.use(express.static('public'));
app.use(express.json());

app.get('/messages', messageController.getMessages);

app.post('/messages', messageController.createMessage);

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(3000, () => console.log('Example app listening on port 3000!'));
