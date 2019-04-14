import { baseUrl } from '../constants'

export function getInitialData() {
	return function(dispatch) {
		dispatch({ type: 'FETCH_DATA' })

		return fetch(baseUrl + `/initialData`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		})
			.then(response => response.json())
			.then(data => {
				dispatch({ type: 'LOAD_DATA', payload: data })
			})
			.catch(err => {
				console.log('ERROR FETCHING DATA: ', err)
			})
	}
}
