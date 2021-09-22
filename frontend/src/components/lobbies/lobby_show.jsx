import React from 'react'
import MessageContainer from "../messages/messages_container"

class LobbyShow extends React.Component {
  constructor(props) {
    super(props)
    this.lobby = this.props.lobby
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.navToGame = this.navToGame.bind(this)
  }

  componentDidMount() {
    this.props.fetchLobby(this.props.match.params.lobbyId)
  }

  //   componentDidUpdate(prevProps) {
  //     if (prevProps.lobby !== this.props.lobby) {
  //       this.props.fetchLobby(this.props.match.params.lobbyId)
  //     }
  //   }

  navToGame() {
    const url = `/games/${this.props.gameId}`
    this.props.history.push(url);
  }

  handleDeleteClick(e) {
    console.log(this.props.lobby)
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
