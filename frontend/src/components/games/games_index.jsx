import React from 'react';
import GameItem from './game_item';
import background_video from '../../assets/videos/worlds.mp4';
import amongus from './game_images/amongus.png';
import apexlegends from './game_images/apex-legends.png';
import csgo from './game_images/csgo.png';
import warzone from './game_images/warzone.png';
import dbd from './game_images/dbd.png';
import fortnite from './game_images/fortnite.png';
import league from './game_images/league.png';
import minecraft from './game_images/minecraft.png';
import overwatch from './game_images/overwatch.png';
import pubg from './game_images/pubg.png';
import siege from './game_images/siege.png';
import roblox from './game_images/roblox.png';
import rocketleague from './game_images/rocketleague.png';
import sea from './game_images/sea.png';
import valorant from './game_images/valorant.png';

class GamesIndex extends React.Component {
  componentDidMount() {
    this.props.fetchAllGames();
  }

  render() {
    const { games } = this.props;

    return (
      <div className="index-content-container">
        <div className="splash-content-container">
          <div className="splash-content">
            <div className="splash-stairs">
              <h2 className="splash-one">
                Find <mark>your</mark> game
              </h2>
              <h2 className="splash-two">
                Create <mark>your</mark> lobby
              </h2>
              <h2 className="splash-three">
                Build <mark>your</mark> team
              </h2>
            </div>
            <div className="splash-image"></div>
            <video
              width="1917"
              src={background_video}
              autoPlay
              muted
              loop
            ></video>
          </div>
        </div>
        <div className="index-content">
          <div className="game-list-container">
            <ul className="game-list">
              {games.map((game) => (
                <GameItem game={game} key={game.name} />
              ))}
            </ul>
          </div>
          <div className="game-box-container">
            <img className="game-box-item" src={amongus} alt=""></img>
            <img className="game-box-item" src={apexlegends} alt=""></img>
            <img className="game-box-item" src={csgo} alt=""></img>
            <img className="game-box-item" src={warzone} alt=""></img>
            <img className="game-box-item" src={dbd} alt=""></img>
            <img className="game-box-item" src={fortnite} alt=""></img>
            <img className="game-box-item" src={league}></img>
            <img className="game-box-item" src={minecraft} alt=""></img>
            <img className="game-box-item" src={overwatch} alt=""></img>
            <img className="game-box-item" src={pubg} alt=""></img>
            <img className="game-box-item" src={siege} alt=""></img>
            <img className="game-box-item" src={roblox} alt=""></img>
            <img className="game-box-item" src={rocketleague} alt=""></img>
            <img className="game-box-item" src={sea} alt=""></img>
            <img className="game-box-item" src={valorant} alt=""></img>
          </div>
        </div>
      </div>
    );
  }
}

export default GamesIndex;
