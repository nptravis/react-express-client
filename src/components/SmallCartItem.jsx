import React, { Component } from 'react'
import styled from 'styled-components'
import { docColors } from '../constants'
import { connect } from 'react-redux'

const Container = styled.div`
	display: flex;
	flex-direction: column;
	border: 1px solid black;
	background-color: ${docColors.lightGrey};
	width: 90%;
	margin: 5px auto;
	padding: 5px;
`

const Child = styled.div`
	flex: 1;

	& > span {
		float: right;
		border: 1px solid black;

		&:hover {
			cursor: pointer;
			background-color: ${docColors.red};
		}
	}
`

const SmallCartItem = props => {
	return (
		<Container>
			<Child>
				<span
					data-id={props.item.id}
					onClick={() => props.handleRemove(props.item.id)}
				>
					X
				</span>
			</Child>
			<Child>
				<h3>
					{props.item.quantity} x {props.item.name}
				</h3>
				<p>Size: {props.item.size}</p>
				<p>Color: {props.item.color}</p>
			</Child>
		</Container>
	)
}

export default SmallCartItem
