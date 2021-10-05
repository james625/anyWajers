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
import Footer from '../footer/footer';
import { Link } from 'react-router-dom';

class GamesIndex extends React.Component {
  componentDidMount() {
    this.props.fetchAllGames();
  }

  render() {
    const { games } = this.props;
    if(!games) return null;
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
              {games.map((game) => {
                if(game._id){
                return  <li key={game._id.toString()}>
                          <GameItem game={game} />
                        </li>
                }
              })}
            </ul>
          </div>
          <div className="game-box-container">
            <Link to={`/games/614d1d4b7572363c1124a86a`}><img className="game-box-item" src={amongus} alt="Among Us"></img></Link>
            <Link to={`/games/614d2d987572363c1124a875`}><img
              className="game-box-item"
              src={apexlegends}
              alt="Apex Legends"
            ></img></Link>
            <Link to={`/games/614a867525334f20ab40d544`}><img className="game-box-item" src={csgo} alt="CSGo"></img></Link>
            <Link to={`/games/614a7aaf25334f20ab40d543`}><img className="game-box-item" src={warzone} alt="Warzone"></img></Link>
            <Link to={`/games/614d1ddf7572363c1124a86d`}><img className="game-box-item" src={dbd} alt="DBD"></img></Link>
            <Link to={`/games/614a872a25334f20ab40d546`}><img className="game-box-item" src={fortnite} alt="Fortnite"></img></Link>
            <Link to={`/games/6148eac6bea214a16d1484a6`}><img className="game-box-item" src={league} alt="League"></img></Link>
            <Link to={`/games/614d1e857572363c1124a86e`}><img
              className="game-box-item"
              src={minecraft}
              alt="Minecraft"
            ></img></Link>
            <Link to={`/games/614d24087572363c1124a86f`}><img
              className="game-box-item"
              src={overwatch}
              alt="Overwatch"
            ></img></Link>
            <Link to={`/games/614d24637572363c1124a870`}><img className="game-box-item" src={pubg} alt="Pubg"></img></Link>
            <Link to={`/games/614d24d37572363c1124a871`}><img className="game-box-item" src={siege} alt="Siege"></img></Link>
            <Link to={`/games/614d25587572363c1124a872`}><img className="game-box-item" src={roblox} alt="Roblox"></img></Link>
            <Link to={`/games/614d29017572363c1124a873`}><img
              className="game-box-item"
              src={rocketleague}
              alt="RocketLeague"
            ></img></Link>
            <Link to={`/games/614d29577572363c1124a874`}><img className="game-box-item" src={sea} alt="Sea"></img></Link>
            <Link to={`/games/614a86bd25334f20ab40d545`}><img className="game-box-item" src={valorant} alt="Valorant"></img></Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default GamesIndex;
