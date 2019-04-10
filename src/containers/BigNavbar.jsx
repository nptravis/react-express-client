import React, { Component } from 'react';
import styled from 'styled-components';
import './Containers.css';
import { textColors } from '../constants'
import { Link } from 'react-router-dom';

const Container = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	height: 100%;

`
const Child = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	height: 100%;
	line-height: 100%;

	&:nth-child(1){
		
		flex: 1;
	}
	&:nth-child(2){
		flex: 3;

	}
	&:nth-child(3){
		flex: 1;
		justify-content: space-around;

	}
	
`

const Links = styled(Link)`
	text-decoration: none;

	& > h2 {
		color: ${textColors.red}
	}
`


class BigNavbar extends React.Component{
 render(){
  return(
   <Container>
    <Child>
    	<Links to="/" ><h2>SHOPMATE</h2></Links>
    </Child>
    <Child>
    	<Links to="/women"><h4>Women</h4></Links>
    	<Links to="/men"><h4>Men</h4></Links>
    	<Links to="/kids"><h4>Kids</h4></Links>
    	<Links to="/shoes"><h4>Shoes</h4></Links>
    	<Links to="/brands"><h4>Brands</h4></Links>
    	
    </Child>
    <Child>
    	<h4><i class="fas fa-search big-navbar-icons fa-sm"></i></h4>
    	<h4><i class="fas fa-shopping-bag big-navbar-icons fa-sm"></i></h4>
    	
    </Child>
   </Container>
  );
 }
}

export default BigNavbar;
