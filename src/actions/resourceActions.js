import { baseUrl } from '../constants'

export function getDepartments() {
	return function(dispatch) {
		dispatch({ type: 'LOADING_DEPARTMENTS' })

		return fetch(baseUrl + `/api/department`, {
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

export function getCategories() {
	return function(dispatch) {
		dispatch({ type: 'LOADING_CATEGORIES' })

		return fetch(baseUrl + `/api/category`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		})
			.then(response => response.json())
			.then(data => {
				dispatch({ type: 'LOADED_CATEGORIES', payload: data })
			})
			.catch(err => {
				console.log('ERROR FETCHING DATA: ', err)
			})
	}
}

export function getProducts() {
	return function(dispatch) {
		dispatch({ type: 'LOADING_PRODUCTS' })

		return fetch(baseUrl + `/api/product`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		})
			.then(response => response.json())
			.then(data => {
				dispatch({ type: 'LOADED_PRODUCTS', payload: data })
			})
			.catch(err => {
				console.log('ERROR FETCHING DATA: ', err)
			})
	}
}

export function getProductAttributes() {
	return function(dispatch) {
		dispatch({ type: 'LOADING_PRODUCT_ATTRIBUTES' })

		return fetch(baseUrl + `/api/product_attribute`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		})
			.then(response => response.json())
			.then(data => {
				dispatch({ type: 'LOADED_PRODUCT_ATTRIBUTES', payload: data })
			})
			.catch(err => {
				console.log('ERROR FETCHING DATA: ', err)
			})
	}
}

export function getProductCategories() {
	return function(dispatch) {
		dispatch({ type: 'LOADING_PRODUCT_CATEGORIES' })

		return fetch(baseUrl + `/api/product_category`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		})
			.then(response => response.json())
			.then(data => {
				dispatch({ type: 'LOADED_PRODUCT_CATEGORIES', payload: data })
			})
			.catch(err => {
				console.log('ERROR FETCHING DATA: ', err)
			})
	}
}

