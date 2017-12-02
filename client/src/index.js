import $ from 'jquery';
import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';

import './main.css';
import './normalize.css';

import App from './components/App';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// $(() => {
//
//   function scrollMessages() {
//     $messagesWrapperNode.animate({ scrollTop: $messagesWrapperNode.prop('scrollHeight') });
//   }
//   function formatMessage(msg) {
//     let sentiment = 0;
//     if (msg.sentScore < -2) {
//       sentiment = '-2';
//     } else if (msg.sentScore < -1) {
//       sentiment = '-1';
//     } else if (msg.sentScore < 1) {
//       sentiment = '0';
//     } else if (msg.sentScore < 2) {
//       sentiment = '1';
//     } else if (msg.sentScore >= 2) {
//       sentiment = '2';
//     }
//     return `
//       <li data-sent="${sentiment}" data-me="${msg.user === user}">
//         <div class="message">
//           ${msg.message}
//           <footer>${msg.user} at ${new Date(msg.created).toLocaleTimeString()}</footer>
//         </div>
//       </li>
//     `;
//   }
//
//   socket.on('new message', (msgObjStr) => {
//     const msgObj = JSON.parse(msgObjStr);
//     $messagesNode.append($(formatMessage(msgObj)));
//     scrollMessages();
//   });
//   socket.on('all messages', (messagesJSON) => {
//     const messages = JSON.parse(messagesJSON);
//     $messagesNode.html(messages.map(formatMessage).join(''));
//     scrollMessages();
//   });
//   socket.on('exception', error => console.error(error));
//
//   $messageFormNode.submit(handleSubmit);
// });
