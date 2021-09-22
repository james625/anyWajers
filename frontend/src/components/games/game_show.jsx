import React from 'react'
import LobbyItemContainer from '../lobbies/lobby_item_container'
import { withRouter } from 'react-router';
// import LobbyCreateContainer from '../lobbies/lobby_create_container'

// link to lobby create container

class GameShow extends React.Component {
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
          {game.data.lobbies.map((lobby) => (
            <LobbyItemContainer lobby={lobby} key={lobby.name} />
          ))}
        </ul>
      </div>
    )
  }
}

export default withRouter(GameShow)
