import axios from 'axios';

export const getGames = () => {
  return axios.get('/api/games')
};

export const getGame = (gameId) => {
    return axios.get(`/api/games/${gameId}`)
}