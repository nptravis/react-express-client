import React, { Component } from 'react'
import styled from 'styled-components'
import { Desktop, Mobile, docColors, textColors } from '../constants'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Container = styled.div`
	dispaly: flex;
	flex-direction: column;
	justify-content: stretch;
	height: 100%;
`

const Child = styled.div`
	border: 1px solid black;
	flex: 1;
	background-color: ${docColors.lightGrey}
	padding: 10px;
	& > div h1,
	h2,
	h3,
	h4,
	p {
		color: ${textColors.black};
	}
	
	&:nth-child(1) {
		height: 60vh;
		background-image: url(${require('../images/store.jpg')});
		background-size: 100% auto;
		background-repeat: no-repeat;
		background-position: left 10% top 35%;
	}

	&:nth-child(2) {
		height: 30vh;
		display: flex;
		justify-content: stretch;

		& > div {
			
			&:nth-child(1) {
				
				flex: 1;
			}
			
			&:nth-child(2) {
				
				flex: 2;
			}
		}
		
	}

	&:nth-child(3) {
		height: 60vh;
	}

	&:nth-child(4) {
		height: 30vh;
	}
`

const Product = styled.img`
	height: 100%;
`

class Homepage extends Component {
	render() {
		let featuredProduct = null
		if (!this.props.loading) {
			featuredProduct = (
				<Product
					src={require(`../images/product_images/${
						this.props.products[1].image
					}`)}
				/>
			)
		}
		return (
			<Container>
				<Desktop>
					<Child>
						<div>
							<h2>Something</h2>
							<p>wefwefwefw</p>
						</div>
					</Child>
					<Child>
						<div>{featuredProduct}</div>
						<div>
							<h4>Something</h4>
							<Link to="/product-index">
								<button>Shop Now</button>
							</Link>
						</div>
					</Child>
					<Child>
						<div>
							<h4>Something</h4>
							<p>wefwefwefw</p>
						</div>
						<div>
							<h1>some image</h1>
						</div>
					</Child>
					<Child>
						<div>
							<h1>some image</h1>
						</div>
						<div>
							<h4>Something</h4>
							<p>wefwefwefw</p>
						</div>
					</Child>
				</Desktop>
			</Container>
		)
	}
}

const mapState = state => {
	return {
		products: state.initialData.products,
		loading: state.initialData.loading
	}
}

export default connect(mapState)(Homepage)
