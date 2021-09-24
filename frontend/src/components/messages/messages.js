import React from 'react';
import { io } from 'socket.io-client';

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: '' };
    this.socket = null;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.socket = io();
    this.props.fetchLobbyMessages(this.props.lobbyId);
    this.socket.on('receive-message', (message) => {
      this.props.fetchLobbyMessages(this.props.lobbyId);
      this.setState({
        input: '',
      });
    });
  }

  handleChange() {
    return (e) => {
      e.preventDefault();
      this.setState({ input: e.currentTarget.value });
    };
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  handleSubmit(e) {
    e.preventDefault();

    const text = {
      text: this.state.input,
      author: this.props.currentUserId,
      lobbyId: this.props.lobbyId,
    };
    this.props.createLobbyMessage(text);

    this.socket.emit('body', text);
  }

  render() {
    if (this.props.messages.length === 0) {
      return (
        <form onSubmit={this.handleSubmit}>
          <input
            className="lobby-chat-box"
            type="text"
            value={this.state.input}
            onChange={this.handleChange()}
          ></input>
          <button className="message-submit">Submit</button>
        </form>
      );
    }
    return (
      <div className="messages-god-container">
        <div className="messages-container">
          <ul className="messages-ul">
            {this.props.messages
              .map((message) => {
                return (
                  <li className="message" key={message._id}>
                    <div className="author-username">
                      {message.author.username}:
                    </div>
                    <div>{message.body}</div>
                  </li>
                );
              })
              .reverse()}
          </ul>
          <form className="">
            <input
              className="lobby-chat-box"
              type="text"
              value={this.state.input}
              onChange={this.handleChange()}
              placeholder="say something nice..."
            ></input>
            <button
              className="message-submit"
              onClick={this.handleSubmit}
            ></button>
          </form>
        </div>
      </div>
    );
  }
}

export default Messages;
