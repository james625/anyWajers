import React from 'react';
import { Link } from 'react-router-dom';

const GameItem = ({ game }) => {
  return (
    <li>
      <Link className="game-item-link" to={`/games/${game._id}`}>
        <p className="game-item">{game.name}</p>
      </Link>
    </li>
  );
};

export default GameItem;
