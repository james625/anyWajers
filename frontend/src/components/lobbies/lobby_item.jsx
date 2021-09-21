import React from 'react'

class LobbyItem extends React.Component {
  constructor(props) {
    super(props)
    this.lobby = this.props.lobby
  }

  render() {
    return (
      <li>
        <div>
          <h4>{this.lobby.name}</h4>
          <p>{this.lobby.description}</p>
          <button>Join</button>
        </div>
      </li>
    )
  }
}

export default LobbyItem
