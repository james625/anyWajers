import axios from 'axios';

export const getLobbys = () => {
    return axios.get('/api/lobbys/');
}

export const getLobby = lobbyId => {
    return axios.get(`/api/lobbys/${lobbyId}`);
}