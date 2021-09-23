import React from 'react';
import LobbyItemContainer from '../lobbies/lobby_item_container';
import { withRouter } from 'react-router';
import { io } from 'socket.io-client';
import animation_scripts from '../../assets/animation_scripts/game_item_list_dropdown';
// import LobbyCreateContainer from '../lobbies/lobby_create_container'

// link to lobby create container

class GameShow extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io();

  constructor(props){
    super(props)
    // this.socket = io()
  
    // this.socket.on('receive-lobby', lobby => {
    //   this.props.fetchGame(this.props.match.params.gameId)
    // })
  }

  componentDidMount() {
    this.props.fetchGame(this.props.match.params.gameId);
    const script = document.createElement('script');
    script.src = { animation_scripts };
    script.async = true;
    document.body.appendChild(script);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.lobbies !== this.props.lobbies) {
      this.props.fetchGame(this.props.match.params.gameId);
    }
  }
  
  // componentWillUnmount(){
  //   this.socket.off('connection')
  // }

  render() {
    const { game } = this.props;

    if (game === undefined || game.data.name === undefined) {
      return null;
    }

    return (
      <div className="game-show-container">
        <div className="game-show-art"></div>
        <div className="game-show-content">
          <div className="game-show-banner">
            <h1 className="game-show-title">{game.data.name}</h1>
            <p className="game-show-description">{game.data.description}</p>
          </div>

          <div className="game-show-list-container">
            <ul className="game-show-list">
              <button
                className="lobby-create"
                onClick={() => this.props.openModal('create')}
              >
                Create Lobby
              </button>
              {game.data.lobbies.map((lobby) => {
                if(lobby.players.length < lobby.playerCount){
                  return <LobbyItemContainer lobby={lobby} key={lobby._id} />
                } else{
                  return null;
                }
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(GameShow);
