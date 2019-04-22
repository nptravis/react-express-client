import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { docColors, textColors } from '../constants'
import { Link } from 'react-router-dom'
import { getColorsByProduct, getSizesByProduct } from '../selectors'
import { LargeButton } from '../components/ComponentLibrary'
import { addToCart } from '../actions/cartActions'

const Container = styled.div`
	display: flex;
	background-color: #fff;
	margin: 2%;
	padding: 10px;
`

const Child = styled.div`
	& > h2,
	h3 {
		color: ${textColors.grey};
	}

	&:nth-child(1) {
		flex: 1;
	}

	&:nth-child(2) {
		flex: 2;

		& > .redText {
			color: ${textColors.red};
		}

		& > h2.productName {
			margin: 15px auto;
			font-weight: bold;
		}
	}

	& > h3 {
		margin: 20px 0 0 0;
	}

	& > input.quantityInput {
		margin: 8px 5px;
	}
`

const MainImageContainer = styled.div`
	padding: 10px;
	text-align: center;
	border: 1px solid ${docColors.lightGrey};
	width: 90%;
	margin: 0 auto;
`

const OtherImagesContainer = styled.div`
	& > img {
		margin: 5px;
		width: 50px;
	}
`

const FlexDiv = styled.div`
	display: flex;
	justify-content: space-between;
`

const SizeDiv = styled.div`
	min-width: 120px;
	background-color: ${docColors.lightGrey};
	line-height: 20px;
	text-align: center;
	padding: 5px;
	margin: 5px;
	& > span {
		vertical-align: middle;
		color: ${textColors.grey};
		font-size: 12pt;
	}

	&:hover {
		cursor: pointer;
		background-color: ${docColors.red};

		& > span {
			color: #fff;
		}
	}

	&.active {
		background-color: ${docColors.red};
		& > span {
			color: #fff;
		}
	}
`

const ColorDiv = styled(SizeDiv)`
	min-width: 70px;
	margin-bottom: 10px;
	& > span {
		color: ${textColors.grey};
		font-size: 10pt;
	}
`

class ProductShow extends React.Component {
	state = {
		quantity: 1,
		size: 'S',
		color: 'White',
		product_id: this.props.match.params.id
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
		this.props.dispatch(addToCart(this.state))
	}

	renderError() {
		return <div>I'm sorry! Please try again.</div>
	}

	renderLoading() {
		return <div>Loading</div>
	}

	renderProduct() {
		const {
			name,
			image,
			price,
			discounted_price,
			image_2,
			description,
			product_id
		} = this.props.products[this.props.match.params.id]

		const colors = getColorsByProduct(
			product_id,
			this.props.product_attributes,
			this.props.attribute_values
		)

		const sizes = getSizesByProduct(
			product_id,
			this.props.product_attributes,
			this.props.attribute_values
		)

		return (
			<Container>
				<Child>
					<MainImageContainer>
						<img src={require('../images/product_images/' + image)} />
					</MainImageContainer>
					<OtherImagesContainer>
						<img src={require('../images/product_images/' + image)} />
						<img src={require('../images/product_images/' + image_2)} />
					</OtherImagesContainer>
				</Child>
				<Child>
					<Link to="/product-index">Home</Link> / {name}
					<h2 className="productName">{name}</h2>
					<h2 className="redText">
						<b>{discounted_price > 0 ? discounted_price : price}</b>
						<small className="strikeout">
							{discounted_price > 0 ? price : null}
						</small>
					</h2>
					<p>{description}</p>
					<h3>Quantity</h3>
					<input
						type="number"
						name="quantity"
						step="1"
						min="1"
						value={this.state.quantity}
						onChange={this.handleIncrement}
						className="quantityInput"
					/>
					<h3>Size</h3>
					<FlexDiv>
						{sizes.map(size => {
							return (
								<SizeDiv
									key={size.attribute_value_id}
									onClick={this.handleActive}
									data-value={size.value}
									data-name={'size'}
									className={this.state.size === size.value ? 'active' : ''}
								>
									<span>{size.value}</span>
								</SizeDiv>
							)
						})}
					</FlexDiv>
					<h3>Color</h3>
					<FlexDiv>
						{colors.map(color => {
							return (
								<ColorDiv
									key={color.attribute_value_id}
									onClick={this.handleActive}
									data-value={color.value}
									data-name={'color'}
									className={this.state.color === color.value ? 'active' : ''}
								>
									<span>{color.value.toUpperCase()}</span>
								</ColorDiv>
							)
						})}
					</FlexDiv>
					<div style={{ textAlign: 'center' }}>
						<LargeButton onClick={this.handleAddToCart}>
							<h4>Add to cart</h4>
						</LargeButton>
					</div>
				</Child>
			</Container>
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
		attribute_values: state.initialData.attribute_values
	}
}

export default connect(mapState)(ProductShow)
