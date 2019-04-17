import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { textColors } from '../constants'
import Popup from 'reactjs-popup'
import { LargeButton } from './ComponentLibrary'
import { getSizesByProduct, getColorsByProduct } from '../selectors'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { addToCart } from '../actions/cartActions'
import uniqid from 'uniqid'

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
			color: '',
			size: ''
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
			sizes: sizes,
			color: colors[0].value,
			size: sizes[0].value
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
			id: uniqid(),
			product_id: this.props.product.product_id,
			size: this.state.size,
			color: this.state.color,
			quantity: 1
		}
		this.props.dispatch(addToCart(item))
	}

	render() {
		let product = this.props.product
		let price =
			product.discounted_price > 0 ? product.discounted_price : product.price
		let originalPrice = product.discounted_price > 0 ? product.price : null

		return (
			<Container>
				<Overlay className="overlay" onClick={this.handleOverlayClick}>
					<div>
						<h2>{product.name}</h2>
						<h3>{price}</h3>
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
						<Button onClick={this.handleAddToCart}>
							<h4>Add to cart</h4>
						</Button>
					</div>
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

const mapState = state => {
	return {
		attributes: state.resourceData.attr,
		productAttributes: state.resourceData.productAttributes,
		attribute_values: state.resourceData.attributeValues,
		loading: state.resourceData.loading
	}
}

export default withRouter(connect(mapState)(ProductCard))
