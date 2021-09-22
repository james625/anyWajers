import { connect } from 'react-redux';
import { addPlayer, fetchLobby, editLobby, deleteLobby } from '../../actions/lobby_actions';

import LobbyItem from './lobby_item';

const mSTP = (state, ownProps) => {
    return {
        currentUserId: state.session.user.id,
        lobby: ownProps.lobby,
    }
}

const mDTP = dispatch => ({
    fetchLobby: lobby_id => dispatch(fetchLobby(lobby_id)),
    editLobby: lobby => dispatch(editLobby(lobby)),
    addPlayer: lobby => dispatch(addPlayer(lobby)),
    deleteLobby: lobbyId => dispatch(deleteLobby(lobbyId))
})

export default connect(mSTP, mDTP)(LobbyItem)