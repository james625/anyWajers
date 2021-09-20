import { RECEIVE_ALL_GAMES, RECEIVE_GAME } from '../actions/game_actions';

const GamesReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    let nextState = Object.assign({}, oldState);

    switch (action.type) {
        case RECEIVE_ALL_GAMES:
            return action.games.data;
        case RECEIVE_GAME:
            nextState[action.game.data._id] = action.game;
            return nextState;
            // return Object.assign({}, oldState, {[action.games.id]})
        default:
            return oldState;
    }
}

export default GamesReducer;