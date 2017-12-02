import io from 'socket.io-client';
import $ from 'jquery';
import React, { Component } from 'react';
import MessageWrapper from './MessageWrapper';
import FormWrapper from './FormWrapper';
import SentScore from './SentScore';
import blockedTerms from './../blockedTerms';

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
      valid: true,
      sentScore: 0,
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
    this.socket.on('sent score', (sentScore) => {
      console.log(sentScore);
      this.setState(() => ({ sentScore }));
    });
    this.socket.on('active users', (activeUsersJSON) => {
      const activeUsers = JSON.parse(activeUsersJSON);
      this.updateActiveUsers(activeUsers);
    });
    this.socket.on('sentScore', (sentScore) => {
      this.setState(() => ({ sentScore: Number(sentScore) }));
    });
    this.socket.on('get user', () => this.socket.emit('user', this.state.user));
    this.socket.on('exception', error => console.error(error));
  }

  componentDidUpdate() {
    const newValid = !this.state.messageValue
      .split(/\b/)
      .some(term => blockedTerms[term.toLowerCase()]);
    if (newValid !== this.state.valid) this.setState({ valid: newValid });
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
        <SentScore sentScore={this.state.sentScore} />
        <MessageWrapper messages={this.state.messages} user={this.state.user} />
        <FormWrapper valid={this.state.valid} messageValue={this.state.messageValue} activeUsers={this.state.activeUsers} submitHandler={this.handleSubmit} changeHandler={this.handleChange} />
      </div>
    );
  }
}

export default App;
