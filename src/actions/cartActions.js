import uniqid from 'uniqid'

export function addToCart(item) {
	const itemWithId = { ...item, id: uniqid() }
	return function(dispatch) {
		dispatch({ type: 'ADDING_ITEM_TO_CART' })
		dispatch({ type: 'ADDED_ITEM_TO_CART', payload: itemWithId })
	}
}

export function removeFromCart(itemId) {
	return function(dispatch) {
		dispatch({ type: 'REMOVING_ITEM_FROM_CART' })
		dispatch({ type: 'REMOVED_ITEM_FROM_CART', payload: itemId })
	}
}

export function incrementItemInCart(itemId) {
	return function(dispatch) {
		dispatch({ type: 'UPDATE_ITEM_IN_CART', payload: itemId })
	}
}
