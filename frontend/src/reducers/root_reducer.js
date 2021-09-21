import { combineReducers } from 'redux';

import sessionsReducer from './session_reducer';
import errors from'./errors_reducer';
import entitiesReducer from './entities_reducer';
import modalReducer from './modals_reducer'

const RootReducer = combineReducers({
  modal: modalReducer,
  entities: entitiesReducer,
  session: sessionsReducer,
  errors
});

export default RootReducer;