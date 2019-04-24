import uniqid from 'uniqid'

export function addToCart(item, cart) {
	const duplicate = cart.find(
		cartItem =>
			cartItem.product_id === item.product_id &&
			cartItem.size === item.size &&
			cartItem.color === item.color
	)

	if (duplicate) {
		return function(dispatch) {
			dispatch({ type: 'UPDATE_ITEM_IN_CART', payload: duplicate.id })
		}
	} else {
		const itemWithId = { ...item, id: uniqid() }
		return function(dispatch) {
			dispatch({ type: 'ADDING_ITEM_TO_CART' })
			dispatch({ type: 'ADDED_ITEM_TO_CART', payload: itemWithId })
		}
	}
}

export function removeFromCart(itemId) {
	return function(dispatch) {
		dispatch({ type: 'REMOVING_ITEM_FROM_CART' })
		dispatch({ type: 'REMOVED_ITEM_FROM_CART', payload: itemId })
	}
}
