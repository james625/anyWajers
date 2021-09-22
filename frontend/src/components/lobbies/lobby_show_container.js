import { connect } from 'react-redux';
import { fetchLobby } from '../../actions/lobby_actions';

import LobbyShow from './lobby_show';

const mSTP = (state, ownProps) => {
    console.log(ownProps)
    // console.log(state.entities)
    return {
        lobby: state.entities.lobbies[ownProps.match.params.lobbyId]
    }
}

const mDTP = dispatch => ({
    fetchLobby: lobbyId => dispatch(fetchLobby(lobbyId)),
})

export default connect(mSTP, mDTP)(LobbyShow)