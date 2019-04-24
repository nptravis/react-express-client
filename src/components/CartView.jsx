import React from 'react'
import styled from 'styled-components'
import { DeleteButton } from './ComponentLibrary'

const Container = styled.div`
	border: 1px solid black;
`

const CartView = props => {
	return (
		<Container>
			<h1>Cart</h1>
			<table align="center">
				<thead>
					<tr>
						<th>Item</th>
						<th>Options</th>
						<th>Quantity</th>
						<th>Price</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{props.cart.map(item => {
						return (
							<tr key={item.id}>
								<td>
									<img
										src={require('../images/product_images/' +
											props.products[item.product_id].image)}
									/>
									{item.name}
								</td>
								<td>{item.size + ' ' + item.color}</td>
								<td>{item.quantity}</td>
								<td>{props.products[item.product_id].price}</td>
								<td>
									<DeleteButton
										data-itemid={item.id}
										onClick={props.handleDeleteItem}
									>
										X
									</DeleteButton>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</Container>
	)
}

export default CartView
