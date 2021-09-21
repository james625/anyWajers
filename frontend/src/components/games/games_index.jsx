import React from 'react';
import GameItem from './game_item';
 
class GamesIndex extends React.Component {
    componentDidMount() {
        this.props.fetchAllGames();
    }

    render() {
        const {games} = this.props;
        
        return (
            <div>
                <h2>Games</h2>
                <ul>
                    {games.map(game => (
                        <GameItem game={game} key={game._id}/>
                    ))}
                </ul>
            </div>
        )
    }
}

export default GamesIndex;