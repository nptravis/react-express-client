import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
// import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/index'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { saveState, loadState } from './localStorage'
import { BrowserRouter as Router } from 'react-router-dom'

const persistedData = loadState()
const store = createStore(
	rootReducer,
	persistedData,
	applyMiddleware(thunk, logger)
)

store.subscribe(() => {
	saveState({
		userData: Object.assign({}, store.getState().userData)
	})
})

export function configureStore() {
	return store
}

if (module.hot) {
	module.hot.accept()
}

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>,
	document.getElementById('root')
)

// registerServiceWorker();
