import { compose,createStore } from 'redux';
import { hashHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import { applyMiddleware } from 'redux';

import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/index';

const defaultState = {};

// redux-dev-tool
let enhancers;
if(process.env.NODE_ENV === 'development') {
	enhancers = compose(
		window.devToolsExtension ? window.devToolsExtension() : f=>f
	);
}

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
const store = createStoreWithMiddleware(rootReducer,defaultState,enhancers);

//const store = createStore(rootReducer,defaultState,enhancers);

// redux-dev-tool

//const store = createStore(rootReducer, defaultState);

export const history = syncHistoryWithStore(hashHistory, store);

export default store;