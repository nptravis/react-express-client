import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`

`

class Homepage extends React.Component{
 render(){
  return(
   <Container>
    <h1>I'm the Homepage component</h1>
   </Container>
  );
 }
}

export default Homepage;
