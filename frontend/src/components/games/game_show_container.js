import { connect } from 'react-redux';
import { fetchGame } from '../../actions/game_actions';
import { openModal } from '../../actions/modal_actions';
import { deleteLobby } from '../../actions/lobby_actions';
import GameShow from './game_show';

const mSTP = (state, ownProps) => {
    return {
        game: state.entities.games[ownProps.match.params.gameId],
        lobbies: state.entities.lobbies,
        currentUser: state.session.user
    }
}

const mDTP = dispatch => ({
    fetchGame: gameId => dispatch(fetchGame(gameId)),
    openModal: modal => dispatch(openModal(modal)),
    deleteLobby: lobbyId => dispatch(deleteLobby(lobbyId))
})

export default connect(mSTP, mDTP)(GameShow)