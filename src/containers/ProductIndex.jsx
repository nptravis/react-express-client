import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { getAll } from '../selectors'
import SearchProducts from '../components/SearchProducts'
import ProductCard from '../components/ProductCard'
import { ProductPagination } from '../components/ProductPagination'

const Container = styled.div`
	display: flex;
	height: 100%;
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
		products: this.props.products,
		currentRange: [0, 9],
		productsPerPage: 9
	}

	renderLoading() {
		return <div>Loading...</div>
	}

	renderIndex() {
		let products = this.props.products

		if (this.state.products.length > 0) {
			products = this.state.products
		}

		const currentRange = products.slice(
			this.state.currentRange[0],
			this.state.currentRange[1]
		)

		return (
			<Container>
				<Child>
					<SearchProducts filterProducts={this.filterProducts} />
				</Child>
				<Child>
					<ProductPagination
						total={products.length}
						productsPerPage={this.state.productsPerPage}
						handleClickNumber={this.handleClickNumber}
						handleNextPage={this.handleNextPage}
						handlePreviousPage={this.handlePreviousPage}
						handleToStart={this.handleToStart}
						handleToEnd={this.handleToEnd}
						currentRange={this.state.currentRange}
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

	renderError() {
		return <div>Opps, try again</div>
	}

	handleClickNumber = e => {
		const end = this.state.productsPerPage * parseInt(e.target.innerText, 10)
		const start = end - this.state.productsPerPage
		this.setState({
			currentRange: [start, end]
		})
	}

	handleNextPage = e => {
		if (this.state.currentRange[1] < this.state.products.length)
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
			this.state.products.length % this.state.productsPerPage
		const lastStart = this.state.products.length - NumOfproductsOnLastPage
		const lastEnd =
			this.state.products.length +
			this.state.productsPerPage -
			NumOfproductsOnLastPage
		this.setState({
			currentRange: [lastStart, lastEnd]
		})
	}

	filterProducts = (categoryIds, searchTerm = '') => {
		const productIds = []

		this.props.productCategories.forEach(prodCat => {
			if (categoryIds.includes(prodCat.category_id)) {
				productIds.push(prodCat.product_id)
			}
		})

		if (searchTerm !== '') {
			this.setState({
				products: this.props.products.filter(product => {
					return (
						productIds.includes(product.product_id) &&
						product.name.includes(searchTerm)
					)
				}),
				currentRange: [0, 9]
			})
		} else {
			this.setState({
				products: this.props.products.filter(product => {
					return productIds.includes(product.product_id)
				}),
				currentRange: [0, 9]
			})
		}
	}

	render() {
		if (this.props.loading) {
			return this.renderLoading()
		} else if (this.props.products.length > 0) {
			return this.renderIndex()
		} else {
			return this.renderError()
		}
	}
}

const mapState = state => {
	return {
		products: getAll(state.initialData.products),
		departments: getAll(state.initialData.departments),
		categories: getAll(state.initialData.categories),
		productCategories: state.initialData.product_categories,
		loading: state.initialData.loading
	}
}

export default connect(mapState)(ProductIndex)
