import React from 'react'
import { Link } from 'react-router-dom'

const GameItem = ({ game }) => {
  return (
    <li>
      <Link to={`/games/${game._id}`}>
        <div>
          <h3>{game.name}</h3>
        </div>
      </Link>
    </li>
  )
}

export default GameItem
