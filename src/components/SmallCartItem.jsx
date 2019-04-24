import React, { Component } from 'react'
import styled from 'styled-components'
import { docColors, textColors } from '../constants'
import { connect } from 'react-redux'
import { DeleteButton } from './ComponentLibrary'

const Container = styled.div`
	text-align: left;
	display: flex;
	background-color: ${docColors.lightGrey};
	width: 90%;
	margin: 5px auto;
	padding: 8px;
`

const Child = styled.div`
	&:nth-child(1) {
		flex: 3;
	}

	&:nth-child(2) {
		flex: 1;
	}

	& > h3:nth-child(1) {
		margin: 0px 5px 5px 5px;
		padding: 0;
	}
	& > h3:nth-child(2) {
		margin: 5px 5px 0px 5px;
		padding: 0;
	}
	& > h3:nth-child(3) {
		margin: 0px 5px 2px 5px;
		padding: 0;
	}
`

const SmallCartItem = props => {
	return (
		<Container>
			<Child>
				<h3 style={{ color: textColors.grey }}>
					{props.item.quantity} <span style={{ color: textColors.red }}>x</span>{' '}
					{props.item.name}
				</h3>
				<h3>Size: {props.item.size}</h3>
				<h3>Color: {props.item.color}</h3>
			</Child>
			<Child>
				<DeleteButton
					data-id={props.item.id}
					onClick={() => props.handleRemove(props.item.id)}
				>
					X
				</DeleteButton>
			</Child>
		</Container>
	)
}

export default SmallCartItem
