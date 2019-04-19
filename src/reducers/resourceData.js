export default function resourceData(
	state = {
		loading: true,
		departments: {},
		categories: {},
		products: {},
		productAttributes: [],
		attr: {},
		attributeValues: []
	},
	action
) {
	switch (action.type) {
		case 'LOADING_PRODUCTS':
			return { ...state, loading: true }
		case 'LOADED_PRODUCTS':
			let newProducts = { ...state.products }
			action.payload.map(product => {
				newProducts[product.product_id] = product
			})
			return { ...state, products: newProducts, loading: false }
		case 'LOADING_PRODUCT_ATTRIBUTES':
			return { ...state, loading: true }
		case 'LOADED_PRODUCT_ATTRIBUTES':
			return { ...state, productAttributes: action.payload }
		case 'LOADING_ATTRIBUTES':
			return { ...state, loading: true }
		case 'LOADED_ATTRIBUTES':
			let newAttr = { ...state.attr }
			action.payload.map(att => {
				newAttr[att.attribute_id] = att
			})
			return { ...state, attr: newAttr }
		case 'LOADING_ATTRIBUTE_VALUES':
			return { ...state, loading: true }
		case 'LOADED_ATTRIBUTE_VALUES':
			return { ...state, attributeValues: action.payload }
		case 'LOADING_PRODUCT_CATEGORIES':
			return { ...state, loading: true }
		case 'LOADED_PRODUCT_CATEGORIES':
			return { ...state, productCategories: action.payload }
		case 'LOADING_DEPARTMENTS':
			return { ...state, loading: true }
		case 'LOADED_DEPARTMENTS':
			let newDepartments = { ...state.departemnts }
			action.payload.map(dept => {
				newDepartments[dept.department_id] = dept
			})
			return { ...state, departments: newDepartments }
		case 'LOADING_CATEGORIES':
			return { ...state, loading: true }
		case 'LOADED_CATEGORIES':
			let newCats = { ...state.categories }
			action.payload.map(cat => {
				newCats[cat.category_id] = cat
			})

			return { ...state, categories: newCats }
		default:
			return state
	}
}
