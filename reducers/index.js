import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import global from './global';
import authed from './authed';

const rootReducer = combineReducers({
  global,
  authed,
  routing:routerReducer
});

export default rootReducer;
