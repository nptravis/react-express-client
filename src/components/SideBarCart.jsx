import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import SmallCartItem from './SmallCartItem'
import { removeFromCart } from '../actions/cartActions'
import { textColors } from '../constants'
import { LargeButton } from './ComponentLibrary'

const Container = styled.div`
	text-align: center;
	padding-bottom: 5%;

	& > div.price {
		width: 90%;
		margin: 0 auto 10px auto;
		text-align: right;
	}

	& > div h2 {
		text-align: left;
		color: ${textColors.grey};
		margin-left: 5%;
	}

	& > ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
`

class SideBarCart extends Component {
	handleRemove = itemId => {
		this.props.dispatch(removeFromCart(itemId))
	}

	render() {
		let display
		let total = null

		this.props.cart.length > 0 ? (display = 'block') : (display = 'none')

		total = this.props.cart
			.reduce((total, current) => {
				let product = this.props.products[current.product_id]
				if (product.discounted_price > 0) {
					total += product.discounted_price * current.quantity
				} else {
					total += product.price * current.quantity
				}
				return total
			}, 0)
			.toFixed(2)

		return (
			<Container style={{ display: display }}>
				<div>
					<h2>Cart</h2>
				</div>
				<ul>
					{this.props.cart.map(item => {
						return (
							<li key={item.id}>
								<SmallCartItem item={item} handleRemove={this.handleRemove} />
							</li>
						)
					})}
				</ul>
				<div className="price">
					<h3 style={{ display: 'inline' }}>Total Price:</h3>
					<h2 style={{ display: 'inline', color: textColors.red }}>
						{'$' + total}
					</h2>
				</div>
				<LargeButton>
					<h4>See Details</h4>
				</LargeButton>
			</Container>
		)
	}
}

const mapState = state => {
	return {
		cart: state.userData.cart,
		products: state.initialData.products,
		loading: state.initialData.loading
	}
}

export default connect(mapState)(SideBarCart)

// array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
