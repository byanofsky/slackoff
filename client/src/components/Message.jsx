import React from 'react';

function Message(props) {
  const msgData = props.data;
  let sentiment = 0;
  if (msgData.sentScore < -2) sentiment = '-2';
  else if (msgData.sentScore < -1) sentiment = '-1';
  else if (msgData.sentScore < 1) sentiment = '0';
  else if (msgData.sentScore < 2) sentiment = '1';
  else if (msgData.sentScore >= 2) sentiment = '2';

  return (
    <li data-sent={sentiment} data-me={props.user === msgData.user}>
      <div className="message">
        {msgData.message}
        <footer>{msgData.user} at {new Date(msgData.created).toLocaleTimeString()}</footer>
      </div>
    </li>
  );
}

export default Message;
