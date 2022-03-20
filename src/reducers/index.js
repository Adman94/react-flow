import {combineReducers} from 'redux'
import authUserReducer from './authUserReducer'
import edgesReducer from './edgesReducer'
import nodesReducer from './nodesReducer'
import formReducer from './formReducer'

const rootReducer = combineReducers({
	authUser: authUserReducer,
	nodes: nodesReducer,
	edges: edgesReducer,
	form: formReducer
});

export default rootReducer