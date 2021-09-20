import { connect } from 'react-redux';
import { fetchAllGames } from '../../actions/game_actions';
import GamesIndex from './games_index';

const mSTP = state => {
    console.log(state)
    return {
        games: Object.values(state.entities.games),
    }
}

const mDTP = dispatch => {
    return {
        fetchAllGames: () => dispatch(fetchAllGames()),
    }
}

export default connect(mSTP, mDTP)(GamesIndex);