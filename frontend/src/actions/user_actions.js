import * as UserApiUtil from '../util/user_api_util'
import { receiveCurrentUser } from './session_actions';

export const RECEIVE_USER = "RECEIVE_USER"
export const REMOVE_USER = "REMOVE_USER"

const receiveUser = user => ({
    type: RECEIVE_USER,
    user
})

const removeUser = user => ({
    type: REMOVE_USER,
    user
})

export const fetchUser = (userId) => dispatch => (
    UserApiUtil.getUser(userId)
    .then(user => dispatch(receiveUser(user)))
)

export const editUser = (user) => dispatch => (
    UserApiUtil.editUser(user)
    .then(user => dispatch(receiveCurrentUser(user)))
)

export const deleteUser = (userId) => dispatch => (
    UserApiUtil.getUser(userId)
    .then(user => dispatch(removeUser(user)))
)
