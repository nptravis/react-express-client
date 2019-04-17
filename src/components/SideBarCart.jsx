import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import SmallCartItem from './SmallCartItem'
import { removeFromCart } from '../actions/cartActions'

const Container = styled.div`
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
		return (
			<Container>
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
		cart: state.userData.cart
	}
}

export default connect(mapState)(SideBarCart)

// array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
