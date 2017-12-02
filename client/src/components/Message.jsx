import React from 'react';

function Message(props) {
  const msgData = props.data;
  return (
    <div>
      {msgData.message}
    </div>
  );
}

export default Message;
