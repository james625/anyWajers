import { combineReducers } from 'redux';
import GameReducer from './game_reducer';
import lobbysReducer from './lobbys_reducer';
import messagesReducer from './messages_reducer';
import UsersReducer from './users_reducer';

const entitiesReducer = combineReducers({
    games: GameReducer,
    messages: messagesReducer,
    lobbies: lobbysReducer,
    users: UsersReducer,
})

export default entitiesReducer;