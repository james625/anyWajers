import React from 'react';
import { io } from 'socket.io-client';

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: '' };
    this.socket = null;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.socket = null;
  }

  componentDidMount() {
    this.socket = io();
    this.props.fetchLobbyMessages(this.props.lobbyId);
    this.socket.on('receive-message', (message) => {
      this.props.fetchLobbyMessages(this.props.lobbyId);
    });
   
  }

  handleChange() {
    return (e) => {
      e.preventDefault();
      this.setState({ input: e.currentTarget.value });
    };
  }

  componentWillUnmount() {
    // this.socket.disconnect();
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
    this.setState({
      input: '',
    });
  }

  render() {
    if (this.props.messages.length === 0) {
      return (
        <div className="messages-god-container">
          <div className="messages-container">
            <form onSubmit={this.handleSubmit}>
              <input
                className="lobby-chat-box"
                type="text"
                value={this.state.input}
                onChange={this.handleChange()}
                placeholder="say something nice..."
              ></input>
              <button className="message-submit">Submit</button>
            </form>
          </div>
        </div>
      );
    }
    return (
      <div className="messages-god-container">
        <div className="messages-container">
          <ul className="messages-ul">
            {this.props.messages.map((message) => {
              if(message.lobby === this.props.lobbyId){
                return (
                  <li className="message" key={message._id}>
                    <div className="author-username">
                      {message.author.username}:
                    </div>
                    <div>{message.body}</div>
                  </li>
                );
              }
            }).reverse()}
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
