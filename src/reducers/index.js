import { combineReducers } from 'redux'
import initialData from './initialData'
import userData from './userData'
import sessionData from './sessionData'
import cacheData from './cacheData'

const rootReducer = combineReducers({
	initialData,
	userData,
	sessionData,
	cacheData
})

export default rootReducer
