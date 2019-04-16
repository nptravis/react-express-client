import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { textColors } from '../constants'
import Popup from 'reactjs-popup'
import { LargeButton } from './ComponentLibrary'

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 30%;
	margin: 1%;
	background-color: #fff;
	position: relative;

	&:hover {
		& > div.overlay {
			display: block;
		}
	}
`

const Child = styled.div`
	flex: 1;
	text-align: center;

	& > img {
		width: 90%;
		margin: 5%;
	}

	& > h2 {
		color: ${textColors.red};
	}

	& > .strikeout {
		text-decoration: line-through;
	}
`

const Overlay = styled.div`
	height: 100%;
	width: 100%;
	background-color: red;
	display: none;
	position: absolute;
	background-color: #ffffffbf;
	& > h2 {
		color: ${textColors.red};
	}

	& > .strikeout {
		text-decoration: line-through;
	}
`

class ProductCard extends React.Component {
	render() {
		let product = this.props.product
		let price =
			product.discounted_price > 0 ? product.discounted_price : product.price
		let originalPrice = product.discounted_price > 0 ? product.price : null
		return (
			<Container>
				<Overlay className="overlay">
					<h3>{product.name}</h3>
					<h2>{price}</h2>
					<h4 className="strikeout">{originalPrice}</h4>
					<select>
						<option>1</option>
						<option>1</option>
						<option>1</option>
					</select>
					<select>
						<option>1</option>
						<option>1</option>
						<option>1</option>
					</select>
					<LargeButton>
						<h4>Add to cart</h4>
					</LargeButton>
				</Overlay>
				<Child>
					<img src={require(`../images/product_images/${product.image}`)} />
				</Child>
				<Child>
					<h3>{product.name}</h3>
					<h2>{price}</h2>
					<h4 className="strikeout">{originalPrice}</h4>
				</Child>
			</Container>
		)
	}
}

ProductCard.propTypes = {
	product: PropTypes.object.isRequired
}

export default ProductCard
