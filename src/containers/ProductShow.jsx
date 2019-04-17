import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

const Container = styled.div``

class ProductShow extends React.Component {
	render() {
		let product = { name: '' }
		if (!this.props.loading) {
			product = this.props.products[this.props.match.params.id]
		}
		return (
			<Container>
				<h1>{product.name}</h1>
			</Container>
		)
	}
}

const mapState = state => {
	return {
		products: state.resourceData.products,
		loading: state.resourceData.loading
	}
}

export default connect(mapState)(ProductShow)
