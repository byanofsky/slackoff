$(() => {
  let user = window.localStorage.getItem('user');
  if (!user) {
    user = window.prompt('What is your name?', 'anon');
    window.localStorage.setItem('user', user);
  }
  const socket = io();
  const $messagesNode = $('#messages');
  const $messageFormNode = $('#message-form');
  const $messageFormWrapper = $('#message-form-wrapper');

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
      user,
    };
    // sendMessage(msgObj);
    sendMessageIO(msgObj);
    // Reset message field
    $(this.message).val('');
    return false;
  }
  function scrollMessages() {
    $messagesNode.animate({ scrollTop: $messagesNode.prop('scrollHeight') });
  }
  function formatMessage(msg) {
    return `
      <li data-me="${msg.user === user}">
        <div class="message">
          ${msg.message}
          <footer>${msg.user}</footer></li>
        </div>
      </li>
    `;
  }

  socket.on('new message', (msgObjStr) => {
    const msgObj = JSON.parse(msgObjStr);
    $messagesNode.append($(formatMessage(msgObj)));
    scrollMessages();
  });
  socket.on('all messages', (messagesJSON) => {
    const messages = JSON.parse(messagesJSON);
    $messagesNode.html(messages.map(formatMessage).join(''));
    scrollMessages();
  });
  socket.on('exception', error => console.error(error));

  $messageFormNode.submit(handleSubmit);
});
