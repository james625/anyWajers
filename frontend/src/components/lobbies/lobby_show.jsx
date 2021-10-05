import React from 'react';
import { io } from 'socket.io-client';
import MessageContainer from '../messages/messages_container';

class LobbyShow extends React.Component {
  constructor(props) {
    super(props);
    this.lobby = this.props.lobby;
    this.navToGame = this.navToGame.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
  }

  componentDidMount() {
    if (!this.props.lobby) {
      this.navToGame();
    } else {
      this.props.fetchLobby(this.props.match.params.lobbyId);
    }
    this.socket = io();
    this.socket.on('receive-user', (user) => {
      this.props.fetchLobby(this.props.match.params.lobbyId);
    });
    // this.socket.on('receive-lobby', lobby => {
    //   this.navToGame();
    // })
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.lobby.data.players !== this.props.lobby.data.player){
      this.socket.once('receive-user', (user) => {
        this.props.fetchLobby(this.props.match.params.lobbyId);
      });
    }
  }

 

  componentWillUnmount() {
    const lobby = {
      id: this.props.match.params.lobbyId,
      playerId: this.props.currentUser,
    };
    if (this.props.lobby) {
      if (this.props.currentUser === this.props.lobby.data.owner) {
        this.props.deleteLobby(this.props.match.params.lobbyId);
      }
      this.props.removePlayer(lobby);
    }
    // this.socket.disconnect();
  }

  navToGame() {
    const url = `/games/${this.props.gameId}`;
    this.props.history.push(url);
  }

  handleLeave(e) {
    e.preventDefault();
    this.socket.emit('left-lobby', this.props.currentUser.username)
    this.navToGame();
  }


  render() {
    const { lobby } = this.props;
    if(!lobby) return null;
    if (lobby === undefined || lobby.data.players === undefined) {
      return null;
    }

    if (!this.props.lobby.data) return null;

    return (
      <div>
        <p className="lobby-title">{lobby.data.name}</p>
        {lobby.data.owner === this.props.currentUser ? (
          <div>
            <button
              className="what-buttons"
              onClick={() => this.props.openModal('edit')}
            >
              Edit
            </button>

          </div>
        ) : null}
        <button className="lobby-leave-button" onClick={this.handleLeave}>
          Leave
        </button>

        <ul className="chat-player-list">
          {lobby.data.players.map((player) => {
            if(!player._id){
              return null;
            } else {
                return  <li className="chat-player-list-item" key={player._id.toString()}>
                      <p>{player.username}</p>
                    </li>
            }
          })}
        </ul>

        <MessageContainer />
      </div>
    );
  }
}

export default LobbyShow;
