import { connect } from 'react-redux';
import { fetchLobby, deleteLobby, removePlayer } from '../../actions/lobby_actions';
import { openModal } from '../../actions/modal_actions';
import { withRouter } from 'react-router';
import LobbyShow from './lobby_show';

const mSTP = (state, ownProps) => {
    return {
        lobby: Object.values(state.entities.lobbies)[Object.values(state.entities.lobbies).length - 1],
        currentUser: state.session.user.id,
        history: ownProps.history,
        gameId: ownProps.match.params.gameId
    }
}

const mDTP = dispatch => ({
    fetchLobby: lobbyId => dispatch(fetchLobby(lobbyId)),
    openModal: modal => dispatch(openModal(modal)),
    deleteLobby: lobbyId => dispatch(deleteLobby(lobbyId)),
    removePlayer: lobby => dispatch(removePlayer(lobby))
})

export default withRouter(connect(mSTP, mDTP)(LobbyShow))