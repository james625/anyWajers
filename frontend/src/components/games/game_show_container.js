import { connect } from 'react-redux';
import { fetchGame } from '../../actions/game_actions';
import { openModal } from '../../actions/modal_actions';

import GameShow from './game_show';

const mSTP = (state, ownProps) => {
    return {
        game: state.entities.games[ownProps.match.params.gameId],
    }
}

const mDTP = dispatch => ({
    fetchGame: gameId => dispatch(fetchGame(gameId)),
    openModal: modal => dispatch(openModal(modal)),
})

export default connect(mSTP, mDTP)(GameShow)