import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`

`

class Footer extends React.Component{
 render(){
  return(
   <Container>
    <h1>I'm the Footer component</h1>
   </Container>
  );
 }
}

export default Footer;
