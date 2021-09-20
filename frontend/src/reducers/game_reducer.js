import { RECEIVE_ALL_GAMES, RECEIVE_GAME } from '../actions/game_actions';

const GamesReducer = (oldState = [], action) => {
    Object.freeze(oldState);
    let nextState = oldState.slice();

    switch (action.type) {
        case RECEIVE_ALL_GAMES:
            return action.games;
        case RECEIVE_GAME:
            nextState[action.game.id] = action.game;
            return nextState;
        default:
            return oldState;
    }
}

export default GamesReducer;