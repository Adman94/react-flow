const initialState = {
	show: false,
	id: null,
	title: null,
	options: null
};

const formReducer = (state=initialState, action) => {
	switch(action.type){
		case 'SHOW_FORM':
			return {show: true, id: null, title: null, options: null};
		case 'HIDE_FORM':
			return {show: false, id: null, title: null, options: null};
		case 'UPDATE_NODE_DATA':
			return {show: true, id: action.id, title: action.title, options: action.options, headers: action.headers, tableType: action.tableType, latexFormula: action.latexFormula}
		default: 
			return state;
		}
}

export default formReducer