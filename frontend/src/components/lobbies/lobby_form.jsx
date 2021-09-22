import React from 'react'

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

    this.handleSubmit = this.handleSubmit.bind(this)
    this.navToLobby = this.navToLobby.bind(this);
  }

  navToLobby() {
    const url = `/game/${this.props.currentGameId}/${this.state.lobby._id}`
    this.props.history.push(url);
  }

  handleSubmit(e) {
    e.preventDefault()
    let lobby = {
      game: this.state.game,
      name: this.state.name,
      owner: this.state.owner,
      description: this.state.description,
      playerCount: this.state.playerCount,
      players: this.state.players,
    }
    this.props.createLobby(lobby).then(console.log(this.state))
    this.props.closeModal()
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
