const initialState = {
	nodes: []
}

const generalUpdateReducer = (state=initialState, action) => {
	switch(action.type){
		case 'UPDATE_TABLE':
			return {...state, nodes: [...action.data]};
		default:
			return state;
	}
}

export default generalUpdateReducer