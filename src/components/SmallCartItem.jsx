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

class SmallCartItem extends Component {
	render() {
		const product = this.props.products[this.props.item.product_id]
		return (
			<Container>
				<Child>
					<span
						data-id={this.props.item.id}
						onClick={() => this.props.handleRemove(this.props.item.id)}
					>
						X
					</span>
				</Child>
				<Child>box2</Child>
			</Container>
		)
	}
}

const mapState = state => {
	return {
		products: state.resourceData.products
	}
}

export default connect(mapState)(SmallCartItem)
