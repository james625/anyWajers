import { connect } from "react-redux";
import {withRouter} from "react-router"
import { createLobbyMessage, fetchLobbyMessages } from "../../actions/message_actions";
import Messages from "./messages";

const mSTP = (state, ownProps) => {
    return {
        messages: Object.values(state.entities.messages),
        lobbyId: ownProps.match.params.lobbyId,
        currentUserId: state.session.user.id,
        name: state.session.user.username,
    }
}

const mDTP = dispatch => {
    return {
        fetchLobbyMessages: lobbyId => dispatch(fetchLobbyMessages(lobbyId)),
        createLobbyMessage: message => dispatch(createLobbyMessage(message))
    }
}

export default withRouter(connect(mSTP, mDTP)(Messages));