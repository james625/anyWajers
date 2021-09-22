import { connect } from 'react-redux';
import { fetchLobby, editLobby } from '../../actions/lobby_actions';
import { closeModal } from '../../actions/modal_actions';
import { withRouter } from 'react-router';

import LobbyEdit from './lobby_edit';

const mSTP = (state, ownProps) => {
    // console.log(ownProps.match.params.lobby_id)
    // console.log(Object.values(state.entities.lobbies)[0])
    return {
        currentUserId: state.session.user.id,
        lobby: Object.values(state.entities.lobbies)[0],
        history: ownProps.history
    }
}

const mDTP = dispatch => ({
    fetchLobby: lobby_id => dispatch(fetchLobby(lobby_id)),
    editLobby: lobby => dispatch(editLobby(lobby)),
    closeModal: () => dispatch(closeModal())
})

export default withRouter(connect(mSTP, mDTP)(LobbyEdit))