import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { getAll } from '../selectors'
import SearchProducts from '../components/SearchProducts'
import ProductBox from '../components/ProductBox'

const Container = styled.div`
	display: flex;
`
const Child = styled.div`
	&:nth-child(1) {
		flex: 1;
	}
	&:nth-child(2) {
		flex: 3;
	}
`
class ProductIndex extends React.Component {
	render() {
		const products = getAll(this.props.products)
		return (
			<Container>
				<Child>
					<SearchProducts />
				</Child>
				<Child>
					{products.map(product => {
						return <ProductBox product={product} />
					})}
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
