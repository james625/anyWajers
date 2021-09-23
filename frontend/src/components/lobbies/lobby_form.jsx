import React from 'react';
import {io} from 'socket.io-client';

class LobbyForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      game: this.props.currentGameId,
      name: '',
      owner: this.props.currentUser.id,
      description: '',
      playerCount: 0,
      players: [],
    }
    // this.socket = io();
    this.handleSubmit = this.handleSubmit.bind(this)
    this.navToLobby = this.navToLobby.bind(this);
  }

  // componentDidUpdate(prevProps){
  //     if(prevProps.lobby !== this.props.lobby){
  //         this.navToLobby(this.props.lobby.data._id)
  //     }
  // }

  navToLobby(lobbyId) {
    const url = `/games/${this.props.currentGameId}/${lobbyId}`
    this.props.history.push(url);
  }

  async handleSubmit(e) {
    e.preventDefault()

    debugger
    try{
      let lobby = {
        game: this.state.game,
        name: this.state.name,
        owner: this.state.owner,
        description: this.state.description,
        playerCount: this.state.playerCount,
        players: this.state.players,
      }
      const lob = await this.props.createLobby(lobby)
      // this.socket.emit('lobby-created', "lobby has been made")
      this.props.closeModal()
      this.navToLobby(lob.lobby.data._id)
   
    } catch {
        console.log("error in submit");
    }

  }

  update(field) {
    return (e) => this.setState({ [field]: e.currentTarget.value });
  }

  render() {
    return (
      <form>
        <div className="lobby-modal-container">
          <div className="lobby-modal-content">
            <p className="lobby-modal-name">LOBBY NAME</p>
            <p className="lobby-modal-breakdown">first impressions count</p>
            <input
              type="text"
              value={this.state.name}
              onChange={this.update('name')}
              className="lobby-modal-name-input"
              spellCheck="false"
              autoFocus
            />
            <p className="lobby-modal-description">DESCRIBE YOUR LOBBY</p>
            <p className="lobby-modal-breakdown">
              what type of players are you looking for?
            </p>
            <textarea
              value={this.state.description}
              onChange={this.update('description')}
              className="lobby-modal-description-input"
            />
            <p className="lobby-modal-player-count">LOBBY SIZE</p>
            <div className="lobby-modal-select-count">
              <p className="lobby-modal-breakdown-exempt">
                how many wajers will be in this lobby?
              </p>
              <select
                className="lobby-modal-player-count-dropdown"
                // value={this.state.playerCount}
                onChange={this.update('playerCount')}
              >
                <option value="2">two</option>
                <option value="3">three</option>
                <option value="4">four</option>
                <option value="5">five</option>
              </select>
            </div>
            <input
              className="lobby-modal-submit"
              type="submit"
              value="DONE"
              onClick={this.handleSubmit}
            />
          </div>
        </div>
      </form>
    );
  }
}

export default LobbyForm;
