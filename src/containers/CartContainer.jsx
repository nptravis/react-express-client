import React, { Component } from 'react'
import { connect } from 'react-redux'
import CartView from '../components/CartView'

class CartContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {}
	}

	componentDidMount() {}

	renderLoading() {
		return <div>Loading...</div>
	}

	renderView() {
		return <CartView cart={this.props.cart} />
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
}

const mapState = state => {
	return {
		loading: state.initialData.loading,
		cart: state.userData.cart
	}
}

export default connect(mapState)(CartContainer)
