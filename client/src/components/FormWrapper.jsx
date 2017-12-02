import React from 'react';
import MessageForm from './MessageForm';
import ActiveUsers from './ActiveUsers';

function FormWrapper(props) {
  return (
    <div id="message-form-wrapper">
      <MessageForm messageValue={props.messageValue} submitHandler={props.submitHandler} changeHandler={props.changeHandler} />
      <ActiveUsers activeUsers={props.activeUsers} />
    </div>
  );
}

export default FormWrapper;
