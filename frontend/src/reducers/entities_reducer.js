import { combineReducers } from 'redux';
import GameReducer from './game_reducer';

const entitiesReducer = combineReducers({
    games: GameReducer,
})

export default entitiesReducer;