import axios from 'axios';

//think that get route is messed up

export const getUser = userId => {
    return axios.get(`/api/users/${userId}`);
}

export const deleteUser = userId => {
    return axios.delete(`api/users/${userId}`);
}

export const editUser = user => {
    return axios.put(`api/users/${user.id}`, user)
}
