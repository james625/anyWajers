import React from 'react';
import {io} from 'socket.io-client';

class LobbyForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      game: this.props.currentGameId,
      name: '',
      owner: this.props.currentUser.id,
      description: '',
      playerCount: 0,
      players: [],
    }
    this.socket = io();
    this.handleSubmit = this.handleSubmit.bind(this)
    this.navToLobby = this.navToLobby.bind(this);
  }

  // componentDidUpdate(prevProps){
  //     if(prevProps.lobby !== this.props.lobby){
  //         this.navToLobby(this.props.lobby.data._id)
  //     }
  // }

  navToLobby(lobbyId) {
    const url = `/games/${this.props.currentGameId}/${lobbyId}`
    this.props.history.push(url);
  }

  async handleSubmit(e) {
    e.preventDefault()
    let lobby = {
      game: this.state.game,
      name: this.state.name,
      owner: this.state.owner,
      description: this.state.description,
      playerCount: this.state.playerCount,
      players: this.state.players,
    }
    const lob = await this.props.createLobby(lobby)
    this.socket.emit('lobby-created', "lobby has been made")
    this.props.closeModal()
    this.navToLobby(lob.lobby.data._id)
  }

  update(field) {
    return (e) => this.setState({ [field]: e.currentTarget.value })
  }

  render() {
    return (
      <div className="login-container">
        <form>
          <div>
            <p>Name</p>
            <input
              type="text"
              value={this.state.name}
              onChange={this.update('name')}
            />
            <p>Description</p>
            <input
              type="text"
              value={this.state.description}
              onChange={this.update('description')}
            />
            <p>Number of Players</p>
            <select
              // value={this.state.playerCount}
              onChange={this.update('playerCount')}
            >
              <option value="">number</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <input type="submit" value="Submit" onClick={this.handleSubmit} />
          </div>
        </form>
      </div>
    )
  }
}

export default LobbyForm
