import React from 'react';
import MessageForm from './MessageForm';

function FormWrapper(props) {
  return (
    <div id="message-form-wrapper">
      <MessageForm messageValue={props.messageValue} submitHandler={props.submitHandler} changeHandler={props.changeHandler} />
    </div>
  );
}

export default FormWrapper;
