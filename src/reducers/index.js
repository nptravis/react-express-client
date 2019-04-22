import { combineReducers } from 'redux'
import initialData from './initialData'
import userData from './userData'
import sessionData from './sessionData'

const rootReducer = combineReducers({
	initialData,
	userData,
	sessionData
})

export default rootReducer
