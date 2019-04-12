import React from 'react'
import styled from 'styled-components'

const Container = styled.div``

const SearchProducts = props => {
	return (
		<Container>
			{props.departments.map(dept => {
				return <button>{dept.name}</button>
			})}
		</Container>
	)
}

export default SearchProducts
