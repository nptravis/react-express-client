import { combineReducers } from 'redux'
import initialData from './initialData'
import userData from './userData'
import sessionData from './sessionData'
import resourceData from './resourceData'

const rootReducer = combineReducers({
	initialData,
	userData,
	sessionData,
	resourceData
})

export default rootReducer
