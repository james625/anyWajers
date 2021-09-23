import React from 'react'

class LobbyEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      game: this.props.lobby.data.game,
      name: this.props.lobby.data.name,
      owner: this.props.lobby.data.owner,
      description: this.props.lobby.data.description,
      playerCount: this.props.lobby.data.playerCount,
      players: [],
    }
    this.lobby = this.props.lobby.data
    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
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
    })
    this.props.closeModal()
  }

  update(field) {
    return (e) => this.setState({ [field]: e.currentTarget.value })
  }

  render() {
    console.log(this.lobby)
    console.log(this.state)
    return (
      <div>
        <form>
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
      </div>
    )
  }
}

export default LobbyEdit