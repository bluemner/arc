import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/root-reducer';
import createLogger from 'redux-logger';
const logger = createLogger();

export default function configureStore(params) {
	let middleware = [thunk, logger];
	const store = createStore(
		rootReducer,
		params,
		compose(
			applyMiddleware(...middleware),
			window.devToolsExtension ? window.devToolsExtension() : f => f
		)
	)
	return store;
}