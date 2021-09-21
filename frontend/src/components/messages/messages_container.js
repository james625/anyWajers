import { connect } from "react-redux";
import { createLobbyMessage, fetchLobbyMessages } from "../../actions/message_actions";
import Messages from "./messages";

const mSTP = state => {
    return {
        messages: Object.values(state.entities.messages)
    }
}

const mDTP = dispatch => {
    return {
        fetchLobbyMessages: lobbyId => dispatch(fetchLobbyMessages(lobbyId)),
        createLobbyMessage: message => dispatch(createLobbyMessage(message))
    }
}

export default connect(mSTP, mDTP)(Messages);