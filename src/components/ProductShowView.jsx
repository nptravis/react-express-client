import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { LargeButton } from './ComponentLibrary'
import { docColors, textColors } from '../constants'

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

	& > h2 small.strikeout {
		margin-left: 20px;
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

const ProjectShowView = props => {
	const {
		name,
		image,
		price,
		discounted_price,
		image_2,
		description,
		product_id
	} = props.product
	return (
		<Container>
			<Child>
				<MainImageContainer>
					<img
						src={require('../images/product_images/' + props.displayImage)}
					/>
				</MainImageContainer>
				<OtherImagesContainer>
					<img
						src={require('../images/product_images/' + image)}
						data-image={image}
						onClick={props.handleDisplayImage}
					/>
					<img
						src={require('../images/product_images/' + image_2)}
						data-image={image_2}
						onClick={props.handleDisplayImage}
					/>
				</OtherImagesContainer>
			</Child>
			<Child>
				<h4>
					<Link to="/product-index">Home</Link> / {name}
				</h4>
				<h2 className="productName">{name}</h2>
				<h2 className="redText">
					<b>${discounted_price > 0 ? discounted_price : price}</b>
					<small className="strikeout">
						{discounted_price > 0 ? '$' + price : null}
					</small>
				</h2>
				<p>{description}</p>
				<h3>Quantity</h3>
				<input
					type="number"
					name="quantity"
					step="1"
					min="1"
					value={props.quantity}
					onChange={props.handleIncrement}
					className="quantityInput"
				/>
				<h3>Size</h3>
				<FlexDiv>
					{props.sizes.map(size => {
						return (
							<SizeDiv
								key={size.attribute_value_id}
								onClick={props.handleActive}
								data-value={size.value}
								data-name={'size'}
								className={props.size === size.value ? 'active' : ''}
							>
								<span>{size.value}</span>
							</SizeDiv>
						)
					})}
				</FlexDiv>
				<h3>Color</h3>
				<FlexDiv>
					{props.colors.map(color => {
						return (
							<ColorDiv
								key={color.attribute_value_id}
								onClick={props.handleActive}
								data-value={color.value}
								data-name={'color'}
								className={props.color === color.value ? 'active' : ''}
							>
								<span>{color.value.toUpperCase()}</span>
							</ColorDiv>
						)
					})}
				</FlexDiv>
				<div style={{ textAlign: 'center' }}>
					<LargeButton onClick={props.handleAddToCart}>
						<h4>Add to cart</h4>
					</LargeButton>
				</div>
			</Child>
		</Container>
	)
}

export default ProjectShowView
