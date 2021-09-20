import axios from 'axios';

export const fetchLobbyMessages = lobbyId => {
    return axios.get(`/api/messages/lobby/${lobbyId}`)
}

export const createLobbyMessage = message => {
    return axios.post(`/api/messages/lobby/${message.lobbyId}`, message)
}