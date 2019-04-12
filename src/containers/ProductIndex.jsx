import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { getAll } from '../selectors'
import SearchProducts from '../components/SearchProducts'
import ProductCard from '../components/ProductCard'
import { ProductPagination } from '../components/ProductPagination'

const Container = styled.div`
	display: flex;
`
const Child = styled.div`
	&:nth-child(1) {
		flex: 1;
	}
	&:nth-child(2) {
		flex: 3;
		& > div {
			display: flex;
			flex-wrap: wrap;
		}
	}
`
class ProductIndex extends React.Component {
	state = {
		currentRange: [0, 9],
		productsPerPage: 12
	}

	handleClickNumber = e => {
		const end = this.state.productsPerPage * parseInt(e.target.innerText, 10)
		const start = end - this.state.productsPerPage
		this.setState({
			currentRange: [start, end]
		})
	}

	handleNextPage = e => {
		if (this.state.currentRange[1] < this.props.products.length)
			this.setState({
				currentRange: this.state.currentRange.map(
					num => num + this.state.productsPerPage
				)
			})
	}

	handlePreviousPage = e => {
		if (this.state.currentRange[0] > 0) {
			this.setState({
				currentRange: this.state.currentRange.map(
					num => num - this.state.productsPerPage
				)
			})
		}
	}

	handleToStart = e => {
		this.setState({
			currentRange: [0, this.state.productsPerPage]
		})
	}

	handleToEnd = e => {
		const NumOfproductsOnLastPage =
			this.props.products.length % this.state.productsPerPage
		const lastStart = this.props.products.length - NumOfproductsOnLastPage
		const lastEnd =
			this.props.products.length +
			this.state.productsPerPage -
			NumOfproductsOnLastPage
		this.setState({
			currentRange: [lastStart, lastEnd]
		})
	}

	render() {
		const rangeOfProducts = [0, 9]

		const currentRange = this.props.products.slice(
			this.state.currentRange[0],
			this.state.currentRange[1]
		)
		return (
			<Container>
				<Child>
					<SearchProducts />
				</Child>

				<Child>
					<ProductPagination
						total={this.props.products.length}
						productsPerPage={this.state.productsPerPage}
						handleClickNumber={this.handleClickNumber}
						handleNextPage={this.handleNextPage}
						handlePreviousPage={this.handlePreviousPage}
						handleToStart={this.handleToStart}
						handleToEnd={this.handleToEnd}
					/>
					<div>
						{currentRange.map(product => {
							return <ProductCard product={product} key={product.product_id} />
						})}
					</div>
				</Child>
			</Container>
		)
	}
}

const mapState = state => {
	return {
		products: getAll(state.initialData.products)
	}
}

export default connect(mapState)(ProductIndex)
