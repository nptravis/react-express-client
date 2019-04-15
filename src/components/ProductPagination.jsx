import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { docColors } from '../constants'
import Pagination from 'react-bootstrap/Pagination'

const Container = styled.div``

const Ul = styled.ul`
	list-style: none;
	margin: 20px auto;

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

	&:hover {
		cursor: pointer;
	}

	&.selectedNumber {
		background-color: ${docColors.red};
	}
`

export const ProductPagination = props => {
	const numberOfPages = Math.ceil(props.total / props.productsPerPage)
	const activePage = Math.floor(props.currentRange[0] / props.productsPerPage)
	return (
		<Container>
			<Pagination>
				<Pagination.First onClick={props.handleToStart} />
				<Pagination.Prev onClick={props.handlePreviousPage} />
				{Array(numberOfPages)
					.fill(1)
					.map((n, index) => {
						return (
							<Pagination.Item
								className={index === activePage ? 'active' : ''}
								onClick={props.handleClickNumber}
								key={index}
							>
								{index + n}
							</Pagination.Item>
						)
					})}
				<Pagination.Next onClick={props.handleNextPage} />
				<Pagination.Last onClick={props.handleToEnd} />
			</Pagination>

			{/*<Ul>
				{createPages(numberOfPages).map(num => {
					return (
						<li>
							<NumberCircle onClick={this.handleClickNumber}>
								{num}
							</NumberCircle>
						</li>
					)
				})}
			</Ul>*/}
		</Container>
	)
}

ProductPagination.proptypes = {
	total: PropTypes.number.isRequired,
	productsPerPage: PropTypes.number.isRequired
}
