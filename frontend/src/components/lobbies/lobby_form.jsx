import React from 'react';

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
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.navToLobby = this.navToLobby.bind(this);
  }

  navToLobby() {
    const url = `/game/${this.props.currentGameId}/${this.state.lobby._id}`;
    this.props.history.push(url);
  }

  handleSubmit(e) {
    e.preventDefault();
    let lobby = {
      game: this.state.game,
      name: this.state.name,
      owner: this.state.owner,
      description: this.state.description,
      playerCount: this.state.playerCount,
      players: this.state.players,
    };
    this.props.createLobby(lobby).then(console.log(this.state));
    this.props.closeModal();
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
