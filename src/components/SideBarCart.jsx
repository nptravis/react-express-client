import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import SmallCartItem from './SmallCartItem'
import { removeFromCart } from '../actions/cartActions'
import { textColors } from '../constants'

const Container = styled.div`
	text-align: left;

	& > h2 {
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
		this.props.cart.length > 0 ? (display = 'block') : (display = 'none')

		return (
			<Container style={{ display: display }}>
				<h2>Cart</h2>
				<ul>
					{this.props.cart.map(item => {
						return (
							<li key={item.id}>
								<SmallCartItem item={item} handleRemove={this.handleRemove} />
							</li>
						)
					})}
				</ul>
			</Container>
		)
	}
}

const mapState = state => {
	return {
		cart: state.userData.cart,
		loading: state.resourceData.loading
	}
}

export default connect(mapState)(SideBarCart)

// array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
