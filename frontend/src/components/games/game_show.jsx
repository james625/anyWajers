import React from 'react'
import LobbyItemContainer from '../lobbies/lobby_item_container'
import { withRouter } from 'react-router';
import { io } from 'socket.io-client';
// import LobbyCreateContainer from '../lobbies/lobby_create_container'

// link to lobby create container

class GameShow extends React.Component {

  constructor(props){
    super(props)
    this.socket = io()
  
    this.socket.on('receive-lobby', lobby => {
      this.props.fetchGame(this.props.match.params.gameId)
    })
  }

  componentDidMount() {
    this.props.fetchGame(this.props.match.params.gameId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.lobbies !== this.props.lobbies) {
      this.props.fetchGame(this.props.match.params.gameId)
    }
  }

  render() {
    const { game } = this.props

    if (game === undefined || game.data.name === undefined) {
      return null
    }

    return (
      <div>
        <h1>{game.data.name}</h1>
        <br />
        <p>{game.data.description}</p>

        <button onClick={() => this.props.openModal('create')}>
          Create a new lobby
        </button>

        <ul>
          {game.data.lobbies.map((lobby) => {
            if (lobby.players.length === 0) {
              this.props.deleteLobby(lobby.id)
            }
            if(lobby.players.length < lobby.playerCount){
              return <LobbyItemContainer lobby={lobby} key={lobby._id} />
            } 
          })}
        </ul>
      </div>
    )
  }
}

export default withRouter(GameShow)
