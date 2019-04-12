import { baseUrl } from '../constants'

export function getDepartments() {
	return function(dispatch) {
		dispatch({ type: 'LOADING_DEPARTMENTS' })

		return fetch(baseUrl + `/departments`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		})
			.then(response => response.json())
			.then(data => {
				dispatch({ type: 'LOADED_DEPARTMENTS', payload: data })
			})
			.catch(err => {
				console.log('ERROR FETCHING DATA: ', err)
			})
	}
}
