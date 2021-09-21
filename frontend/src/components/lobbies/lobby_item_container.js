import { connect } from 'react-redux';
import { fetchLobby } from '../../actions/lobby_actions';

import LobbyItem from './lobby_item';

const mSTP = (state, ownProps) => {
    // console.log(ownProps.match.params.lobby_id)
    // console.log(ownProps.lobby)
    return {
        lobby: ownProps.lobby,
    }
}

const mDTP = dispatch => ({
    fetchLobby: lobby_id => dispatch(fetchLobby(lobby_id)),
})

export default connect(mSTP, mDTP)(LobbyItem)