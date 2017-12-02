import React from 'react';
import Message from './Message';

function MessageWrapper(props) {
  const messages = props.messages.map(msg => <Message key={msg._id} data={msg} user={props.user} />);
  return (
    <div id="messages-wrapper">
      <ul id="messages">
        {messages}
      </ul>
    </div>
  );
}

export default MessageWrapper;
