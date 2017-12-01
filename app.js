const express = require('express');
const messageController = require('./controllers/messageController');

const app = express();

app.use(express.static('public'));
app.use(express.json());

app.get('/messages', (req, res) => res.send('Hello World!'));

app.post('/messages', messageController.createMessage);

app.listen(3000, () => console.log('Example app listening on port 3000!'));
