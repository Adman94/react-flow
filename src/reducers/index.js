import {combineReducers} from 'redux'
import authUserReducer from './authUserReducer'
import edgesReducer from './edgesReducer'
import nodesReducer from './nodesReducer'
import formReducer from './formReducer'
import generalUpdateReducer from './generalUpdateReducer'

const rootReducer = combineReducers({
	authUser: authUserReducer,
	nodes: nodesReducer,
	edges: edgesReducer,
	form: formReducer,
	general: generalUpdateReducer
});

export default rootReducer