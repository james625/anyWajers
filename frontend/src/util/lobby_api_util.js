import axios from 'axios';

export const getLobbies = () => {
    return axios.get('/api/lobbys');
}

export const getLobby = lobby_id => {
    return axios.get(`/api/lobbys/${lobby_id}`);
}

export const createLobby = lobby => {
    return axios.post('api/lobbys', lobby)
}

export const deleteLobby = lobby_id => {
    return axios.delete(`api/lobbys/${lobby_id}`);
}

export const editLobby = lobby => {
    return axios.put(`api/lobbys/${lobby.id}`, lobby)
}

export const addPlayer = lobby => {
    return axios.put(`api/lobbys/${lobby.id}/add`, lobby )
}

export const removePlayer = lobby => {
    return axios.put(`api/lobbys/${lobby.id}/remove`, lobby)
}