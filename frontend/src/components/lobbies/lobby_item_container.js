import { connect } from 'react-redux';
import { fetchLobby } from '../../actions/game_actions';

import LobbyItem from './game_show';

const mSTP = (state, ownProps) => {
    return {
        lobby: state.entities.lobbies[ownProps.match.params.lobby_id],
    }
}

const mDTP = dispatch => ({
    fetchLobby: lobby_id => dispatch(fetchLobby(lobby_id)),
})

export default connect(mSTP, mDTP)(LobbyItem)