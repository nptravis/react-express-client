const sizeId = 1
const colorId = 2

export const getAll = obj => Object.keys(obj).map(key => obj[key])

export const getColors = attribute_values => {
	return attribute_values.filter(attr => attr.attribute_id === colorId)
}

export const getSizes = attribute_values => {
	return attribute_values.filter(attr => attr.attribute_id === sizeId)
}

export const getProductAttributes = (productId, product_attributes) => {
	return product_attributes.filter(attr => attr.product_id === productId)
}

export const getColorsByProduct = (
	productId,
	product_attributes,
	attribute_values
) => {
	const ids = getProductAttributes(productId, product_attributes).map(
		attr => attr.attribute_value_id
	)

	return attribute_values.filter(attr => {
		return (
			ids.includes(attr.attribute_value_id) && attr.attribute_id === colorId
		)
	})
}

export const getSizesByProduct = (
	productId,
	product_attributes,
	attribute_values
) => {
	const ids = getProductAttributes(productId, product_attributes).map(
		attr => attr.attribute_value_id
	)

	return attribute_values.filter(attr => {
		return ids.includes(attr.attribute_value_id) && attr.attribute_id === sizeId
	})
}
