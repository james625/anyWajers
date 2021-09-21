import React from 'react'
import { Link } from 'react-router-dom'
import { LobbyItem } from '../lobbies/lobby_item'
// import lobbies


class GameShow extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchGame(this.props.match.params.gameId)
  }

  render() {
    const { game } = this.props
    if (game == undefined || game.data.name == undefined) {
      return null
    }

    return (
      <div>
        <h1>{game.data.name}</h1>
        <br />
        <p>{game.data.description}</p>
        {/* <ul>
            {game.data.lobbies.map(lobby => (
              <LobbyItem lobby={lobby} key={lobby.name}/>
            ))}
        </ul> */}
      </div>
    )
  }
}

export default GameShow
