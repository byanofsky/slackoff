import io from 'socket.io-client';
import $ from 'jquery';
import React, { Component } from 'react';
import MessageWrapper from './MessageWrapper';
import FormWrapper from './FormWrapper';
import ActiveUsers from './ActiveUsers';

function getUser() {
  let user = window.localStorage.getItem('user');
  if (!user) {
    user = window.prompt('What is your name?', 'anon');
    window.localStorage.setItem('user', user);
  }
  return user;
}

function scrollMessages() {
  $('html, body').animate({ scrollTop: $('html').height() - $(window).height() }, 'fast');
}


class App extends Component {
  constructor(props) {
    super(props);

    this.socket = io();

    this.state = {
      messages: [],
      messageValue: '',
      user: getUser(),
      activeUsers: [],
    };

    this.sendMessage = this.sendMessage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.socket.on('new message', (messageJSON) => {
      const message = JSON.parse(messageJSON);
      this.setState((prevState) => {
        const newState = prevState.messages.concat([message]);
        return { messages: newState };
      });
      scrollMessages();
    });
    this.socket.on('all messages', (allMessagesJSON) => {
      const messages = JSON.parse(allMessagesJSON);
      this.setState(() => ({ messages }));
      scrollMessages();
    });
    this.socket.on('active users', (activeUsersJSON) => {
      const activeUsers = JSON.parse(activeUsersJSON);
      this.updateActiveUsers(activeUsers);
    });
    this.socket.on('get user', () => this.socket.emit('user', this.state.user));
    this.socket.on('exception', error => console.error(error));
  }

  sendMessage(messageData) {
    this.socket.emit('new message', JSON.stringify(messageData));
  }

  handleSubmit(event) {
    event.preventDefault();
    const messageData = {
      message: this.state.messageValue,
      user: this.state.user,
    };
    this.sendMessage(messageData);
    // Reset message field
    this.setState({ messageValue: '' });
  }

  handleChange(event) {
    this.setState({ messageValue: event.target.value });
  }

  updateActiveUsers(activeUsers) {
    this.setState({ activeUsers: activeUsers });
  }

  render() {
    return (
      <div id="chat-module">
        <ActiveUsers activeUsers={this.state.activeUsers} />
        <MessageWrapper messages={this.state.messages} user={this.state.user} />
        <FormWrapper messageValue={this.state.messageValue} submitHandler={this.handleSubmit} changeHandler={this.handleChange} />
      </div>
    );
  }
}

export default App;
