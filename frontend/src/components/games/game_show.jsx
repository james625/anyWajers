import React from 'react'
import { LobbyItemContainer } from '../lobbies/lobby_item_container'

// import lobbies


class GameShow extends React.Component {
  
  componentDidMount() {
    this.props.fetchGame(this.props.match.params.gameId)
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
        {/* <ul>
            {game.data.lobbies.map(lobby => (
              <LobbyItemContainer lobby={lobby} key={lobby.name}/>
            ))}
        </ul> */}
      </div>
    )
  }
}

export default GameShow
