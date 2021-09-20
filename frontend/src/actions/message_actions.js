import * as messageUtils from "../util/message_util"

export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES'
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE'

const receiveMessages = messages => {
    return {
        type: RECEIVE_MESSAGES,
        messages
    }
}

const receiveMessage = message => {
    return {
        type: RECEIVE_MESSAGE,
        message
    }
}

export const fetchLobbyMessages = lobbyId => dispatch => {
    return messageUtils.fetchLobbyMessages(lobbyId).then(messages => dispatch(receiveMessages(messages)))
}

export const createLobbyMessage = message => dispatch => {
    return messageUtils.createLobbyMessage(message).then(message => dispatch(receiveMessage(message)))
}