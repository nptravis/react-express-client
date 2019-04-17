export default function userData(
	state = {
		loading: true,
		cart: []
	},
	action
) {
	switch (action.type) {
		case 'ADDING_ITEM_TO_CART':
			return { ...state, loading: true }
		case 'ADDED_ITEM_TO_CART':
			return {
				...state,
				cart: [...state.cart, action.payload],
				loading: false
			}
		case 'REMOVING_ITEM_FROM_CART':
			return { ...state, loading: true }
		case 'REMOVED_ITEM_FROM_CART':
			return {
				...state,
				cart: state.cart.filter(item => item.id !== action.payload),
				loading: false
			}
		default:
			return state
	}
}
