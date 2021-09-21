import { REMOVE_LOBBY, RECEIVE_LOBBY, RECEIVE_ALL_LOBBIES } from "../actions/lobby_actions";

const lobbysReducer =(state = [], action) => {
    Object.freeze(state);
    let nextState = Object.assign( {} , state );

    switch (action.type) {
        case RECEIVE_ALL_LOBBIES:
            return action.lobbies;
        case RECEIVE_LOBBY:
            nextState[action.lobby.id] = action.lobby;
            return nextState;
        case REMOVE_LOBBY:
            delete nextState[action.lobby.id]
            return nextState;
        default:
            return state;

    }
}

export default lobbysReducer;