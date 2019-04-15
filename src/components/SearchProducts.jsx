import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { getAll } from '../selectors'
import { getCategories } from '../actions/resourceActions'
import Button from 'react-bootstrap/Button'

const Container = styled.div``

class SearchProducts extends Component {
	state = {
		selectedDepartmentId: null,
		selectedCategoryId: null,
		categories: []
	}

	componentDidMount() {
		this.props.dispatch(getCategories())
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
		return (
			<Container>
				<input type="text" onChange={this.handleSearchChange} />
				{this.props.departments.map(dept => {
					return (
						<Button
							key={dept.department_id}
							data-deptid={dept.department_id}
							onClick={this.handleDeptClick}
							className={
								this.state.selectedDepartmentId === dept.department_id
									? 'active'
									: ''
							}
						>
							{dept.name}
						</Button>
					)
				})}

				{this.state.categories.map(category => {
					return (
						<Button
							key={category.category_id}
							data-categoryid={category.category_id}
							onClick={this.handleCategoryClick}
							className={
								this.state.selectedCategoryId === category.category_id
									? 'active'
									: ''
							}
						>
							{category.name}
						</Button>
					)
				})}
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
