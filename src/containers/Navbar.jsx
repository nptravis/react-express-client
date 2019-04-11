import React, { Component } from 'react';
import styled from 'styled-components';
import './Containers.css';
import { textColors } from '../constants'
import { Link } from 'react-router-dom';
import {Desktop, Mobile } from '../constants'

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

	& > h2, h1 {
		color: ${textColors.red}
	}
`


class Navbar extends React.Component{
 render(){
 	
  return(
   <Container>

   <Desktop>
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
	    	<Links to="/search"><h4><i class="fas fa-search big-navbar-icons fa-sm"></i></h4></Links>
	    	<Links to="/cart"><h4><i class="fas fa-shopping-bag big-navbar-icons fa-sm"></i></h4></Links>
	    	
	    </Child>
    </Desktop>

    <Mobile>
    	<Child>
	    	<Links to="/" ><h2>SHOPMATE</h2></Links>
	    </Child>
	    <Links to="/menu"><h2 style={{margin: '12px 10px 0px 0px'}}><i class="fas fa-bars"></i></h2></Links>
    </Mobile>

   </Container>
  );
 }
}

export default Navbar;
