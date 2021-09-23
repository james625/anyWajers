import React from 'react';

class LobbyItem extends React.Component {
  constructor(props) {
    super(props);
    this.lobby = this.props.lobby;
    this.handleJoin = this.handleJoin.bind(this);
    this.navToLobby = this.navToLobby.bind(this);
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
    this.navToLobby();
  }

  render() {
    return (
      <li className="game-show-list-item">
        <p>{this.lobby.name}</p>
        <p className="lobby-description">{this.lobby.description}</p>
        <button className="lobby-join-button" onClick={this.handleJoin}>
          JOIN
        </button>
      </li>
    );
  }
}

export default LobbyItem;
