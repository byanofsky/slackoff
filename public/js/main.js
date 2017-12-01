$(() => {
  const socket = io();
  const $messagesNode = $('#messages');
  const $messageFormNode = $('#message-form');

  function getMessages() {
    $.get('/messages')
      .done((data) => {
        $messagesNode.html(data.map(msg => `<li>${msg.message}<footer>${msg.author}</footer></li>`)
          .join(''));
      })
      .fail(() => {
        console.log('Failed to get messages');
      });
  }
  function sendMessage(msgObj) {
    $.ajax({
      url: '/messages',
      type: 'post',
      data: JSON.stringify(msgObj),
      dataType: 'json',
      contentType: 'application/json',
    })
      .done((response) => {
        getMessages();
      })
      .fail(() => {
        console.log('Failed to get messages');
      });
  }
  function sendMessageIO(msgObj) {
    socket.emit('new message', JSON.stringify(msgObj));
  }
  function handleSubmit() {
    const msgObj = {
      message: this.message.value,
      user: this.user.value,
    };
    // sendMessage(msgObj);
    sendMessageIO(msgObj);
    return false;
  }

  socket.on('new message', (msgObjStr) => {
    const msgObj = JSON.parse(msgObjStr);
    $messagesNode.append($('<li>').html(`${msgObj.message}<footer>${msgObj.user}</footer>`));
  });
  socket.on('all messages', (messagesJSON) => {
    const messages = JSON.parse(messagesJSON);
    $messagesNode.html(messages.map(msg => `<li>${msg.message}<footer>${msg.user}</footer></li>`)
      .join(''));
  });
  socket.on('exception', error => console.error(error));

  $messageFormNode.submit(handleSubmit);
});
