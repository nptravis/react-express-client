import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`

`

class BigNavbar extends React.Component{
 render(){
  return(
   <Container>
    <h1>I'm the BigNavbar component</h1>
   </Container>
  );
 }
}

export default BigNavbar;
