import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { docColors } from '../constants'

const Container = styled.div``

const Ul = styled.ul`
	list-style: none;

	& > li {
		display: inline-block;
	}
`
const NumberCircle = styled.div`
	width: 18px;
	height: 18px;
	padding: 4px;
	font: 16px Arial, sans-serif;

	background: #fff;
	border: 2px solid #666;
	color: #666;
	text-align: center;

	border-radius: 50%;
`

class Pagination extends React.Component {
	render() {
		let NumberOfPages = this.props.total / 9
		return (
			<Container>
				<Ul>
					<li>
						<NumberCircle>1</NumberCircle>
					</li>
					<li>
						<NumberCircle>2</NumberCircle>
					</li>
					<li>
						<NumberCircle>3</NumberCircle>
					</li>
				</Ul>
			</Container>
		)
	}
}

Pagination.proptypes = {
	total: PropTypes.number.isRequired
}

export default Pagination
