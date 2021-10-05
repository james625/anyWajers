import React from 'react';
import { Link } from 'react-router-dom';

const GameItem = ({ game }) => {
  return (
  
      <Link className="game-item-link" to={`/games/${game._id}`} replace>
        <p className="game-item">{game.name}</p>
      </Link>
  );
};

export default GameItem;
