import React from 'react';

function MessageForm(props) {
  return (
    <form id="message-form" onSubmit={props.submitHandler}>
      <input onChange={props.changeHandler} id="message-input" type="text" name="message" value={props.messageValue} placeholder="Enter message here..." />
      <button id="submit-button" className="button-primary" type="submit" name="button">
        Submit
      </button>
    </form>
  );
}

export default MessageForm;
