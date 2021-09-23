import React from 'react'
import { io } from "socket.io-client";

class LobbyItem extends React.Component {
  constructor(props) {
    super(props)
    this.lobby = this.props.lobby
    this.handleJoin = this.handleJoin.bind(this)
    this.navToLobby = this.navToLobby.bind(this)
    this.socket = io();

  }

  navToLobby() {
    const url = `/games/${this.lobby.game}/${this.lobby._id}`
    this.props.history.push(url);
  }

  handleJoin(){
    this.props.addPlayer({id: this.props.lobby._id, playerId: this.props.currentUserId})
    this.socket.emit('lobby', this.props.username)
    this.navToLobby()
  }

  render() {
    return (
      <li>
        <div>
          <h4>{this.lobby.name}</h4>
          <p>{this.lobby.description}</p>
          <button onClick={this.handleJoin}>Join</button>
        </div>
      </li>
    )
  }
}

export default LobbyItem
