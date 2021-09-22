import React from 'react';

class LobbyShow extends React.Component {
  componentDidMount() {
    this.props.fetchLobby(this.props.match.params.lobbyId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.lobby !== this.props.lobby) {
      this.props.fetchLobby(this.props.match.params.lobbyId)
    }
  }

  render() {
    const { lobby } = this.props

    if (lobby === undefined || lobby.data.name === undefined) {
      return null
    }

    return (
      <div>
        <h1>{lobby.data.name}</h1>
        <br />
        <p>{lobby.data.description}</p>

        <ul>
          {lobby.data.players.map((player) => (
            <li>
                <p>{player.username}</p>
                <p>{player.rating}</p>
            </li>

          ))}
        </ul>
      </div>
    )
  }
}

export default LobbyShow