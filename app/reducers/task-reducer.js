const ini = {

};
export default function typesReducer(state= ini, action){
	switch (action.type){
		case '':
			return  Object.assign({}, state, {});
		default:
			return state;
	}
}