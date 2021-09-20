import { combineReducers } from 'redux';
import GameReducer from './game_reducer';
import messagesReducer from './messages_reducer';

const entitiesReducer = combineReducers({
    games: GameReducer,
    messages: messagesReducer
})

export default entitiesReducer;