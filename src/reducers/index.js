import { combineReducers } from 'redux';

import todo from './todo';
import auth from './auth';
import message from './message';

const rootReducer = combineReducers({
  auth,
  todo,
  message,
});

export default rootReducer;
