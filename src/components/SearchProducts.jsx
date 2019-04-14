import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { getAll } from '../selectors'
import { getCategories } from '../actions/resourceActions'

const Container = styled.div``

class SearchProducts extends Component {
	state = {
		selectedDepartmentId: null,
		categories: []
	}

	componentDidMount() {
		this.props.dispatch(getCategories())
	}

	handleDeptClick = e => {
		const department_id = parseInt(e.target.dataset.deptid, 10)
		const categories = this.props.categories.filter(
			category => category.department_id === department_id
		)

		this.setState({
			selectedDepartmentId: department_id,
			categories: categories
		})

		this.props.filterProducts(categories.map(c => c.category_id))
	}

	handleCategoryClick = e => {}

	render() {
		return (
			<Container>
				{this.props.departments.map(dept => {
					return (
						<button
							key={dept.department_id}
							data-deptid={dept.department_id}
							onClick={this.handleDeptClick}
						>
							{dept.name}
						</button>
					)
				})}
				{this.state.categories.map(category => {
					return (
						<button
							key={category.category_id}
							data-categoryid={category.category_id}
							onClick={this.handleCategoryClick}
						>
							{category.name}
						</button>
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
