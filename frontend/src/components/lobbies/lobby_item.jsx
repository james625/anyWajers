import React from 'react';
import { io } from 'socket.io-client';

class LobbyItem extends React.Component {
  constructor(props) {
    super(props);
    this.lobby = this.props.lobby;
  
    this.state = { active: false };

    this.handleJoin = this.handleJoin.bind(this);
    this.navToLobby = this.navToLobby.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  componentDidMount(){
    this.socket = io();
  }

  navToLobby() {
    const url = `/games/${this.lobby.game}/${this.lobby._id}`;
    this.props.history.push(url);
  }

  handleJoin() {
    this.props.addPlayer({
      id: this.props.lobby._id,
      playerId: this.props.currentUserId,
    });
    this.socket.emit('lobby', this.props.username);
    this.socket.disconnect();
    this.navToLobby();
  }

  toggleMenu(e) {
    e.preventDefault();
    this.setState({ active: !this.state.active });
  }

  render() {
    return (
      <div className="game-show-list-item-dropdown-container">
        <li className="game-show-list-item" onClick={this.toggleMenu}>
          <p>{this.lobby.name}</p>
          <p>
            {this.lobby.players.length}/{this.lobby.playerCount}
          </p>
        </li>
        {this.state.active ? (
          <div className="game-show-list-dropdown">
            <p className="lobby-description">{this.lobby.description}</p>
            <div className="game-show-user-list-container">
              <ul className="game-show-user-list">
                {this.lobby.players.map((player) => {
                  return (
                    <li
                      key={player._id}
                      className="game-show-list-dropdown-item"
                    >
                      <p className="game-show-list-dropdown-username">
                        {player.username}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
            <button className="lobby-join-button" onClick={this.handleJoin}>
              JOIN
            </button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default LobbyItem;
