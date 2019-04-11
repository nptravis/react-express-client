import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { getAll } from '../selectors'
import SearchProducts from '../components/SearchProducts'
import ProductCard from '../components/ProductCard'
import ProductPagination from '../components/ProductPagination'

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
	render() {
		const rangeOfProducts = [0, 9]
		const products = getAll(this.props.products)
		return (
			<Container>
				<Child>
					<SearchProducts />
				</Child>

				<Child>
					<ProductPagination total={products.length} />
					<div>
						{products.map(product => {
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
		products: state.initialData.products
	}
}

export default connect(mapState)(ProductIndex)
