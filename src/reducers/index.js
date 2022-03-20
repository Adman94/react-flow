import {combineReducers} from 'redux'
import authUserReducer from './authUserReducer'
import edgesReducer from './edgesReducer'
import nodesReducer from './nodesReducer'

const rootReducer = combineReducers({
	authUser: authUserReducer,
	nodes: nodesReducer,
	edges: edgesReducer
});

export default rootReducer