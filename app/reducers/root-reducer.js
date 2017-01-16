import {combineReducers} from 'redux';
import { routerReducer} from 'react-router-redux';

//TODO : add reducers

const rootReducer = combineReducers({
	//reducers
	routing: routerReducer
});
export default rootReducer;