const initialData = {
	name: 'admin'
}

const authUserReducer = (state=initialData, action) => {
	switch(action.type){
		case 'LOG_IN':
			return {
			...state,
			name: 'admin'
			};
		case 'LOG_OUT': 
			return {
			...state,
			name: ''
			};
		default:
			return state;
	}
}

export default authUserReducer