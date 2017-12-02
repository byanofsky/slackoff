import React from 'react';
import Message from './Message';

function MessageWrapper(props) {
  const messages = props.messages.map(msg => <Message key={msg._id} data={msg} />);
  return (
    <div>
      {messages}
    </div>
  );
}

export default MessageWrapper;
