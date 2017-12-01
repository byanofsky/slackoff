$(() => {
  const $messagesNode = $('#messages');
  const $messageFormNode = $('#message-form');

  $(document).ajaxSuccess(function(...args) {
    console.log(args);
  });

  function getMessages() {
    $.get('/messages')
      .done((data) => {
        console.log(data);
        $messagesNode.html(data.map(msg => `<li>${msg.message}</li>`).join(''));
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
        console.log(response);
        getMessages();
      })
      .fail(() => {
        console.log('Failed to get messages');
      });
  }
  function handleSubmit(event) {
    sendMessage({
      message: this.message.value,
      user: this.user.value,
    });
    return false;
  }

  $messageFormNode.submit(handleSubmit);

  getMessages();
});
