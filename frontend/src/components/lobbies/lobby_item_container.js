import { connect } from 'react-redux';
import { addPlayer, fetchLobby, editLobby, deleteLobby } from '../../actions/lobby_actions';
import { withRouter } from 'react-router';

import LobbyItem from './lobby_item';

const mSTP = (state, ownProps) => {
    return {
        currentUserId: state.session.user.id,
        lobby: ownProps.lobby,
        history: ownProps.history
    }
}

const mDTP = dispatch => ({
    fetchLobby: lobby_id => dispatch(fetchLobby(lobby_id)),
    editLobby: lobby => dispatch(editLobby(lobby)),
    addPlayer: lobby => dispatch(addPlayer(lobby)),
})

export default withRouter(connect(mSTP, mDTP)(LobbyItem))