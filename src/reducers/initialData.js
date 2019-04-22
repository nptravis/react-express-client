export default function initialData(
	state = {
		loading: true,
		featuredProductId: 1,
		products: {},
		attributes: {},
		attribute_values: [],
		departments: {},
		categories: {},
		product_attributes: [],
		product_categories: []
	},
	action
) {
	switch (action.type) {
		case 'FETCH_DATA':
			return { ...state, loading: true }
		case 'LOAD_DATA':
			let newDept = {}
			let newProd = {}
			let newCat = {}
			let newProdCat = action.payload.product_categories
			let newProdAttr = action.payload.product_attributes
			let newAttr = {}
			let newAttrVal = action.payload.attribute_values

			action.payload.departments.map(dept => {
				newDept[dept.department_id] = dept
			})

			action.payload.categories.map(cat => {
				newCat[cat.category_id] = cat
			})

			action.payload.products.map(p => {
				newProd[p.product_id] = p
			})

			action.payload._attributes.map(attr => {
				newAttr[attr.attribute_id] = attr
			})

			return {
				...state,
				departments: newDept,
				categories: newCat,
				products: newProd,
				product_attributes: newProdAttr,
				product_categories: newProdCat,
				attributes: newAttr,
				attribute_values: newAttrVal,
				loading: false
			}

		default:
			return state
	}
}
