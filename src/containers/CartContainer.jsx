import React, { Component } from 'react'
import { connect } from 'react-redux'
import CartView from '../components/CartView'
import { removeFromCart } from '../actions/cartActions'

class CartContainer extends Component {
	renderLoading() {
		return <div>Loading...</div>
	}

	renderView() {
		return (
			<CartView
				cart={this.props.cart}
				products={this.props.products}
				handleDeleteItem={this.handleDeleteItem}
			/>
		)
	}

	renderError() {
		return <div>Oops, please try again.</div>
	}

	render() {
		if (this.props.loading) {
			return this.renderLoading()
		} else if (!this.props.loading) {
			return this.renderView()
		} else {
			return this.renderError()
		}
	}

	handleDeleteItem = e => {
		this.props.dispatch(removeFromCart(e.target.dataset.itemid))
	}
}

const mapState = state => {
	return {
		loading: state.initialData.loading,
		cart: state.userData.cart,
		products: state.initialData.products
	}
}

export default connect(mapState)(CartContainer)
