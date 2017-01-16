import { createStore, applyMiddleware, combineReducers, compose}  from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/root-reducer';

export default function configureStore(params){
	const store = createStore(
		rootReducer, 
		applyMiddleware(thunk)
	)
	return store;
}