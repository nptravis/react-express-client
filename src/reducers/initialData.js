export default function initialData(
	state = {
		loading: true,
		featuredProductId: 1,
		products: {}
	},
	action
) {
	switch (action.type) {
		case 'FETCH_DATA':
			return { ...state, loading: true }
		case 'LOAD_DATA':
			let newProducts = { ...state.products }

			action.payload.map(product => {
				newProducts[product.product_id] = product
			})
			return { ...state, products: newProducts, loading: false }
		default:
			return state
	}
}
