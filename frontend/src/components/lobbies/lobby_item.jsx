import React from 'react'
import { Link } from 'react-router-dom';

class LobbyItem extends React.Component {
  constructor(props) {
    super(props)
    this.lobby = this.props.lobby
  }

  render() {
    console.log(this.lobby._id)
    return (
      <li>
        <div>
          <h4>{this.lobby.name}</h4>
          <p>{this.lobby.description}</p>
          <button><Link to={`/lobby/${this.lobby._id}`}>Join</Link></button>
        </div>
      </li>
    )
  }
}

export default LobbyItem
