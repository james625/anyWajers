import React from 'react'
import { Link } from 'react-router-dom';

class LobbyItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      game: this.props.lobby.game,
      name: this.props.lobby.name,
      owner:this.props.lobby.owner,
      description: this.props.lobby.description,
      playerCount: this.props.lobby.playerCount,
      players: [],
    }
    this.lobby = this.props.lobby
    this.handleClick = this.handleClick.bind(this);
    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.handleJoin = this.handleJoin.bind(this)
  }

  handleClick(e){
    e.preventDefault();
    this.setState({
      show: true
    })
  }

  handleDeleteClick(e){
    e.preventDefault();
    this.props.deleteLobby(this.lobby._id)
  
  }

  handleJoin(){
    this.props.addPlayer({id: this.props.lobby._id, playerId: this.props.currentUserId})
  }

  handleSubmit(e) {
    e.preventDefault()
    let lobby = {
      game: this.state.game,
      name: this.state.name,
      owner: this.state.owner,
      description: this.state.description,
      playerCount: this.state.playerCount,
      id: this.lobby._id
    }

    this.props.editLobby(lobby)
    this.setState({
      game: this.props.currentGameId,
      name: '',
      owner: this.props.currentUserId,
      description: '',
      playerCount: 0,
      show: false
    })
  }

  update(field) {
    return (e) => this.setState({ [field]: e.currentTarget.value })
  }

  render() {
    let button, deleteButton;
    if(this.props.currentUserId === this.lobby.owner) {
      button =  <button onClick={this.handleClick}>Edit</button>
      deleteButton= <button onClick={this.handleDeleteClick}>delete</button>
    } else {
      button = null
      deleteButton = null
    }
    return (
      <li>
        <div>
          <h4>{this.lobby.name}</h4>
          <p>{this.lobby.description}</p>
          <button onClick={this.handleJoin}>Join</button>
          {button}
          {deleteButton}
        </div>

        <form className={this.state.show ? "show" : "hide"}>
          <div>
            <p>Name</p>
            <input
              type="text"
              value={this.state.name}
              placeholder={this.lobby.name}
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
              value={this.state.playerCount}
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
      </li>
    )
  }
}

export default LobbyItem
