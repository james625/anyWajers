import { REMOVE_USER, RECEIVE_USER } from "../actions/user_actions";

const UsersReducer =(state = {}, action) => {
    Object.freeze(state);
    let nextState = Object.assign( {} , state );

    switch (action.type) {
        case RECEIVE_USER:
            // nextState[action.user.data._id] = action.user;
            // return nextState;
            return { [action.user.data._id]:action.user }
        case REMOVE_USER:
            delete nextState[action.user.data._id]
            return nextState;
        default:
            return state;

    }
}

export default UsersReducer;