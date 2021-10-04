import React from 'react'
import LobbyItemContainer from '../lobbies/lobby_item_container'
import { withRouter } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// import { io } from 'socket.io-client';
// import LobbyCreateContainer from '../lobbies/lobby_create_container'

// link to lobby create container

class GameShow extends React.Component {
  constructor(props) {
    super(props)
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  componentDidMount() {
    //   this.socket = io();
    //   this.socket.on('receive-lobby', (lobby) => {
    //     this.props.fetchGame(this.props.match.params.gameId);
    //   });
    this.props.fetchGame(this.props.match.params.gameId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.lobbies !== this.props.lobbies) {
      this.props.fetchGame(this.props.match.params.gameId)
    }
  }

  // componentWillUnmount() {
  //   this.socket.disconnect();
  // }

  // user() {

  // }

  // noUser() {

  // }
  handleCreate() {
    // console.log(!!this.props.currentUser)
    if (this.props.currentUser !== undefined &&
      this.props.currentUser.id !== undefined) {
      this.props.openModal('create')
    } else {
      this.props.openModal('login')
    }
  }

  handleRefresh(e) {
    e.preventDefault()
    this.props.fetchGame(this.props.match.params.gameId)
  }

  render() {
    const { game } = this.props

    if (game === undefined || game.data.name === undefined) {
      return null
    }

    return (
      <div className="game-show-god-container">
        <div className="game-show-art"></div>
        <div className="game-show-container">
          <div className="game-show-content">
            <div className="game-show-banner">
              <h1 className="game-show-title">{game.data.name}</h1>
              <p className="game-show-description">{game.data.description}</p>
            </div>

            <div className="game-show-list-container">
              <div className='show-buttons-top'>
                <button
                  className="lobby-create"
                  onClick={this.handleCreate}
                >
                  Create Lobby
                </button>
                <button className="lobby-refresh" onClick={this.handleRefresh}>
                  <FontAwesomeIcon className='redo' icon={['fas', 'redo']} />
                </button>
              </div>
              <br />
              <ul className="game-show-list">
                {game.data.lobbies.map((lobby) => {
                  if (lobby.players.length < lobby.playerCount) {
                    return <LobbyItemContainer lobby={lobby} key={lobby._id} />
                  } else {
                    return null
                  }
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(GameShow)
