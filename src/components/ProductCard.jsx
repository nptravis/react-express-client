import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Container = styled.div`
	display: flex;
	flex-direction: column;
	border: 1px solid black;
	width: 150px;
`

const Child = styled.div`
	flex: 1;
`

class ProductCard extends React.Component {
	render() {
		return (
			<Container>
				<h4>{this.props.product.name}</h4>
			</Container>
		)
	}
}

ProductCard.propTypes = {
	product: PropTypes.object.isRequired
}

export default ProductCard
