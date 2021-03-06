import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { textColors } from '../constants'
import Popup from 'reactjs-popup'
import { LargeButton } from './ComponentLibrary'
import { getSizesByProduct, getColorsByProduct } from '../selectors'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { addToCart, incrementItemInCart } from '../actions/cartActions'

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 30%;
	margin: 1%;
	background-color: #fff;
	position: relative;

	&:hover {
		& > div.overlay {
			display: flex;
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
	flex-direction: column;
	text-align: center;

	-webkit-box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.75);
	-moz-box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.75);
	box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.75);

	& > div:nth-child(1) {
		display: inline-block;
		flex: 1;
		padding-top: 10px;

		& > h3 {
			color: ${textColors.red};
		}

		& > .strikeout {
			text-decoration: line-through;
		}
	}

	& > div:nth-child(2) {
		display: inline-block;
		flex: 1;
	}

	&:hover {
		cursor: pointer;
	}
`

const Button = styled(LargeButton)`
	margin-top: 10px;
`

class ProductCard extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			colors: [],
			sizes: [],
			color: 'White',
			size: 'S'
		}
	}

	static getDerivedStateFromProps(props, state) {
		const colors = getColorsByProduct(
			props.product.product_id,
			props.productAttributes,
			props.attribute_values
		)
		const sizes = getSizesByProduct(
			props.product.product_id,
			props.productAttributes,
			props.attribute_values
		)
		return {
			colors: colors,
			sizes: sizes
		}
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleOverlayClick = e => {
		this.props.history.push('/product/' + this.props.product.product_id)
	}

	handleAddToCart = e => {
		e.stopPropagation()

		const item = {
			product_id: this.props.product.product_id,
			name: this.props.product.name,
			size: this.state.size,
			color: this.state.color,
			quantity: 1
		}

		this.props.dispatch(addToCart(item, this.props.cart))
	}

	render() {
		let product = this.props.product
		let price =
			product.discounted_price > 0 ? product.discounted_price : product.price
		let originalPrice =
			product.discounted_price > 0 ? '$' + product.price : null

		return (
			<Container>
				<Overlay className="overlay" onClick={this.handleOverlayClick}>
					<div>
						<h2>{product.name}</h2>
						<h2 style={{ color: textColors.red }}>
							<b>${price}</b>
						</h2>
						<h4 className="strikeout">{originalPrice}</h4>
					</div>
					<div>
						<select
							onClick={e => e.stopPropagation()}
							name="size"
							onChange={this.handleChange}
						>
							{this.state.sizes.map(size => {
								return <option key={size.value}>{size.value}</option>
							})}
						</select>
						<select
							onClick={e => e.stopPropagation()}
							name="color"
							onChange={this.handleChange}
						>
							{this.state.colors.map(color => {
								return <option key={color.value}>{color.value}</option>
							})}
						</select>
						<div>
							<Button onClick={this.handleAddToCart}>
								<h4>Add to cart</h4>
							</Button>
						</div>
					</div>
				</Overlay>
				<Child>
					<img src={require(`../images/product_images/${product.image}`)} />
				</Child>
				<Child>
					<h3>{product.name}</h3>

					<h2>
						<b>{'$' + price}</b>
					</h2>

					<h4 className="strikeout">{originalPrice}</h4>
				</Child>
			</Container>
		)
	}
}

ProductCard.propTypes = {
	product: PropTypes.object.isRequired
}

const mapState = state => {
	return {
		attributes: state.initialData.attr,
		productAttributes: state.initialData.product_attributes,
		attribute_values: state.initialData.attribute_values,
		loading: state.initialData.loading,
		cart: state.userData.cart
	}
}

export default withRouter(connect(mapState)(ProductCard))
