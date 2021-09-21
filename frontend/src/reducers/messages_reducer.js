const { RECEIVE_MESSAGES, RECEIVE_MESSAGE } = require("../actions/message_actions");

const messagesReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_MESSAGES:
            return Object.assign({}, action.messages.data)
        case RECEIVE_MESSAGE:
            return Object.assign({}, state, { [action.message.data._id]: action.message.data })
        default:
            return state
    }
}

export default messagesReducer;