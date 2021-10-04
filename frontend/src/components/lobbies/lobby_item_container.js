import { connect } from 'react-redux';
import { addPlayer, fetchLobby, editLobby } from '../../actions/lobby_actions';
import { withRouter } from 'react-router';
import { openModal } from '../../actions/modal_actions';

import LobbyItem from './lobby_item';

const mSTP = (state, ownProps) => {
    return {
        currentUser: state.session.user,
        // username: state.session.user.username,
        lobby: ownProps.lobby,
        history: ownProps.history
    }
}

const mDTP = dispatch => ({
    fetchLobby: lobby_id => dispatch(fetchLobby(lobby_id)),
    editLobby: lobby => dispatch(editLobby(lobby)),
    addPlayer: lobby => dispatch(addPlayer(lobby)),
    openModal: modal => dispatch(openModal(modal)),
})

export default withRouter(connect(mSTP, mDTP)(LobbyItem))