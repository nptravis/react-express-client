import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getColorsByProduct, getSizesByProduct } from '../selectors'
import { addToCart } from '../actions/cartActions'
import ProjectShowView from '../components/ProductShowView'
import { withRouter } from 'react-router-dom'

class ProductShow extends Component {
	constructor(props) {
		super(props)

		const product = props.products[props.match.params.id]
		this.state = {
			quantity: 1,
			size: 'S',
			color: 'White',
			product: product,
			displayImage: product.image
		}
	}

	handleDisplayImage = e => {
		this.setState({
			displayImage: e.target.dataset.image
		})
	}

	handleIncrement = e => {
		this.setState({
			[e.target.name]: parseInt(e.target.value, 10)
		})
	}

	handleActive = e => {
		this.setState({
			[e.currentTarget.dataset.name]: e.currentTarget.dataset.value
		})
	}

	handleAddToCart = e => {
		const item = {
			product_id: this.state.product.product_id,
			name: this.state.product.name,
			size: this.state.size,
			color: this.state.color,
			quantity: this.state.quantity
		}
		this.props.dispatch(addToCart(item, this.props.cart))
		this.props.history.push('/cart')
	}

	renderError() {
		return <div>I'm sorry! Please try again.</div>
	}

	renderLoading() {
		return <div>Loading</div>
	}

	renderProduct() {
		const colors = getColorsByProduct(
			this.state.product.product_id,
			this.props.product_attributes,
			this.props.attribute_values
		)

		const sizes = getSizesByProduct(
			this.state.product.product_id,
			this.props.product_attributes,
			this.props.attribute_values
		)

		let displayImage = this.state.product.image

		if (this.state.displayImage) {
			displayImage = this.state.displayImage
		}
		return (
			<ProjectShowView
				{...this.state}
				handleDisplayImage={this.handleDisplayImage}
				handleIncrement={this.handleIncrement}
				handleActive={this.handleActive}
				handleIncrement={this.handleIncrement}
				handleAddToCart={this.handleAddToCart}
				sizes={sizes}
				colors={colors}
			/>
		)
	}
	render() {
		if (this.props.loading) {
			return this.renderLoading()
		} else if (this.props.products[this.props.match.params.id]) {
			return this.renderProduct()
		} else {
			return this.renderError()
		}
	}
}

const mapState = state => {
	return {
		products: state.initialData.products,
		loading: state.initialData.loading,
		product_attributes: state.initialData.product_attributes,
		attribute_values: state.initialData.attribute_values,
		cart: state.userData.cart
	}
}

export default withRouter(connect(mapState)(ProductShow))
