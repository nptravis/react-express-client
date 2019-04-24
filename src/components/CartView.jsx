import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
	border: 1px solid black;
`

const CartView = props => {
	return (
		<Container>
			<h1>this is the CartView view.</h1>
		</Container>
	)
}

export default CartView
