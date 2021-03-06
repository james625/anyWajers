import * as lobbyApiUtil from '../util/lobby_api_util'

export const RECEIVE_ALL_LOBBIES = "RECEIVE_ALL_LOBBIES"
export const RECEIVE_LOBBY = "RECEIVE_LOBBY"
export const REMOVE_LOBBY = "REMOVE_LOBBY"

const receiveAllLobbies = lobbies => ({
    type: RECEIVE_ALL_LOBBIES,
    lobbies
})

const receiveLobby = lobby => {
    return{
    type: RECEIVE_LOBBY,
    lobby
}}

export const removeLobby = lobby => ({
    type: REMOVE_LOBBY,
    lobby
})


export const fetchAllLobbies = () => dispatch => (
    lobbyApiUtil.getLobbies()
        .then(lobbies => dispatch(receiveAllLobbies(lobbies)))
)

export const fetchLobby = (lobby_id) => dispatch => (
    lobbyApiUtil.getLobby(lobby_id)
        .then(lobby => dispatch(receiveLobby(lobby)))
)

export const createLobby = (lobby) => dispatch => (
    lobbyApiUtil.createLobby(lobby)
        .then(lobby => dispatch(receiveLobby(lobby)))
)

export const deleteLobby = lobby_id => dispatch => (
    lobbyApiUtil.deleteLobby(lobby_id)
        .then(lobby => dispatch(removeLobby(lobby)))
)

export const addPlayer = lobby => dispatch => (
    lobbyApiUtil.addPlayer(lobby)
        .then(lobby => dispatch(receiveLobby(lobby)))
)

export const removePlayer = lobby => dispatch => (
    lobbyApiUtil.removePlayer(lobby)
        .then(lobby => dispatch(receiveLobby(lobby)))
)

export const editLobby = lobby => dispatch => (
    lobbyApiUtil.editLobby(lobby)
        .then(lobby => dispatch(receiveLobby(lobby)))
)