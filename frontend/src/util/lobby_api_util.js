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
    return axios.post(`api/lobbys/${lobby_id}`);
}