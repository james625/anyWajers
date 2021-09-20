import { combineReducers } from 'redux';
import sessionsReducer from './session_reducer';
import errors from'./errors_reducer';

const RootReducer = combineReducers({
  session: sessionsReducer,
  errors
});

export default RootReducer;