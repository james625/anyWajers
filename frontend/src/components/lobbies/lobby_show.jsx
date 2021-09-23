import React from 'react';
import { io } from 'socket.io-client';
import MessageContainer from "../messages/messages_container";

class LobbyShow extends React.Component {
  constructor(props) {
    super(props)
    this.lobby = this.props.lobby
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.navToGame = this.navToGame.bind(this)
    this.handleLeave = this.handleLeave.bind(this)
  }
  
  componentDidMount() {
    this.props.fetchLobby(this.props.match.params.lobbyId)
    this.socket = io();
    this.socket.on('receive-user', user => {
      this.props.fetchLobby(this.props.match.params.lobbyId)
    })
    this.socket.on('receive-lobby', lobby => {
      this.navToGame();
    })
  }

  // componentDidUpdate(prevProps){
  //   if(prevProps.lobby !== this.props. )
  // }

  componentWillUnmount(){
    const lobby ={
      id: this.props.match.params.lobbyId,
      playerId: this.props.currentUser
    }
    if(this.props.currentUser === this.props.lobby.data.owner){
      this.props.deleteLobby(this.props.match.params.lobbyId)
    }
    this.props.removePlayer(lobby)

    this.socket.disconnect()
  }

  navToGame() {

    const url = `/games/${this.props.gameId}`
    this.props.history.push(url);
  }

  handleLeave(e){
    e.preventDefault()
    if(this.props.currentUser === this.props.lobby.data.owner){
      this.props.deleteLobby(this.props.match.params.lobbyId)
      this.socket.emit('delete-lobby', "lobby-deleted")
      this.navToGame();
    }else {
      const lobby ={
        id: this.props.lobby.data._id,
        playerId: this.props.currentUser
      }
      this.props.removePlayer(lobby)
      this.navToGame();
    }
  }

  handleDeleteClick(e) {
    e.preventDefault()
    this.props.deleteLobby(this.props.lobby.data._id)
    this.navToGame()
  }

  render() {
    const { lobby } = this.props

    if (lobby === undefined || lobby.data.players === undefined) {
      return null
    }

    return (
      <div>
        <h1>{lobby.data.name}</h1>
        {lobby.data.owner === this.props.currentUser ? 
          <div>
            <button onClick={() => this.props.openModal('edit')}>Edit</button>
            <button onClick={this.handleDeleteClick}>delete</button>
          </div>
         : null }
         <button onClick={this.handleLeave}>Leave Lobby</button>
        <br />
        <p>{lobby.data.description}</p>

        <ul>
          {lobby.data.players.map((player) => (
            <li key={player._id}>
              <p>{player.username}</p>
              {/* <p>{player.rating}</p> */}
            </li>
          ))}
        </ul>

        <MessageContainer />
      </div>
    )
  }
}

export default LobbyShow
