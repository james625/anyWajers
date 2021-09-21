import React from 'react'
// import { Link } from 'react-router-dom'

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
      </div>
    )
  }
}

export default GameShow
