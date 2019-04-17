import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { getAll } from '../selectors'
import Button from 'react-bootstrap/Button'
import { textColors, docColors } from '../constants'
import SideBarCart from './SideBarCart'

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 90%;
	margin: 65px auto;
	background-color: #fff;
`

const Child = styled.div`
	width: 100%;
	text-align: center;

	& > h2 {
		text-align: left;
		margin-left: 5%;
		color: ${textColors.grey};
	}

	&:nth-child(1) {
	}

	&:nth-child(2) {
		margin-top: 20px;
	}

	&:nth-child(3) {
		margin-top: 20px;
	}

	&:nth-child(4) {
		margin-top: 20px;
	}

	& > input {
		width: 90%;
		margin-top: 5%;
	}

	& > button {
		display: inline-block;
		width: 90%;
		margin-bottom: 5px;
		color: ${textColors.grey};
		background-color: ${docColors.lightGrey};

		&.active {
			background-color: ${docColors.red};
			color: #fff;
		}
	}
`

class SearchProducts extends Component {
	state = {
		selectedDepartmentId: null,
		selectedCategoryId: null,
		categories: []
	}

	handleDeptClick = e => {
		const department_id = parseInt(e.target.dataset.deptid, 10)

		if (this.state.selectedDepartmentId === department_id) {
			this.setState({
				selectedDepartmentId: null,
				selectedCategoryId: null,
				categories: []
			})
			this.props.filterProducts(this.props.categories.map(c => c.category_id))
		} else {
			const categories = this.props.categories.filter(
				category => category.department_id === department_id
			)

			this.setState({
				selectedDepartmentId: department_id,
				categories: categories
			})

			this.props.filterProducts(categories.map(c => c.category_id))
		}
	}

	handleCategoryClick = e => {
		const category_id = parseInt(e.target.dataset.categoryid, 10)

		if (this.state.selectedCategoryId === category_id) {
			this.setState({
				selectedCategoryId: null
			})
			this.props.filterProducts(this.state.categories.map(c => c.category_id))
		} else {
			this.setState({
				selectedCategoryId: category_id
			})
			this.props.filterProducts([category_id])
		}
	}

	handleSearchChange = e => {
		let categoryIds = []

		if (this.state.selectedCategoryId) {
			categoryIds = [this.state.selectedCategoryId]
		} else if (this.state.selectedDepartmentId) {
			categoryIds = this.state.categories.map(c => c.category_id)
		} else {
			categoryIds = this.props.categories.map(c => c.category_id)
		}

		this.props.filterProducts(categoryIds, e.target.value)
	}

	render() {
		let display = 'none'
		if (this.state.selectedDepartmentId) {
			display = 'block'
		}
		return (
			<Container>
				<Child>
					<input
						type="text"
						onChange={this.handleSearchChange}
						placeholder="Search"
					/>
				</Child>
				<Child>
					<h2>Department</h2>
					{this.props.departments.map(dept => {
						return (
							<button
								key={dept.department_id}
								data-deptid={dept.department_id}
								onClick={this.handleDeptClick}
								className={
									this.state.selectedDepartmentId === dept.department_id
										? 'active'
										: ''
								}
							>
								{dept.name.toUpperCase()}
							</button>
						)
					})}
				</Child>
				<Child>
					<h2 style={{ display: display }}>Category</h2>
					{this.state.categories.map(category => {
						return (
							<button
								key={category.category_id}
								data-categoryid={category.category_id}
								onClick={this.handleCategoryClick}
								className={
									this.state.selectedCategoryId === category.category_id
										? 'active'
										: ''
								}
							>
								{category.name.toUpperCase()}
							</button>
						)
					})}
				</Child>
				<Child>
					<SideBarCart />
				</Child>
			</Container>
		)
	}
}

const mapState = state => {
	return {
		departments: getAll(state.resourceData.departments),
		categories: getAll(state.resourceData.categories)
	}
}

export default connect(mapState)(SearchProducts)
