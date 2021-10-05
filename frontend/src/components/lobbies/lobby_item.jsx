import React from 'react';
import { io } from 'socket.io-client';
import { Link } from 'react-router-dom';

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
    this.props.fetchLobby(this.props.lobby._id)
    this.socket = io();
  }

  navToLobby() {
    const url = `/games/${this.props.lobby.game}/${this.props.lobby._id}`;

    this.props.history.push(url);
  }

  handleJoin() {
    if (this.props.currentUser !== undefined && this.props.currentUser.id !== undefined) {
      this.props.addPlayer({
        id: this.props.lobby._id,
        playerId: this.props.currentUser.id,
      });
      this.socket.emit('lobby', this.props.currentUser.username);
      this.socket.disconnect();
      this.navToLobby();
    } else {
      this.props.openModal('login')
    }
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
            {this.props.lobby.players.length}/{this.lobby.playerCount}
          </p>
        </li>
        {this.state.active ? (
          <div className="game-show-list-dropdown">
            <p className="lobby-description">{this.lobby.description}</p>
            <div className="game-show-user-list-container">
              <ul className="game-show-user-list">
                {this.props.lobby.players.map((player) => {
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
            <Link to={`/games/${this.lobby.game}/${this.lobby._id}`}>
              <button className="lobby-join-button" onClick={this.handleJoin}>
                JOIN
              </button>
            </Link>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default LobbyItem;
