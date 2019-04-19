import React, { Component } from 'react'
import './App.css'
import { getProducts, getProductCategories } from './actions/resourceActions'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import styled from 'styled-components'
import Navbar from './containers/Navbar'
import Footer from './containers/Footer'
import Homepage from './containers/Homepage'
import ProductIndex from './containers/ProductIndex'
import ProductShow from './containers/ProductShow'
import { withRouter } from 'react-router-dom'
import { docColors } from './constants'

const Container = styled.div`
  padding: 10px;
  background-color: ${docColors.lightGrey};
  min-height: 100vh;

  & > header {
    min-height: 10%;
  }
  & > main {
    min-height: 80%;
  }
  & > footer {
    text-align: center;
    min-height: 10%;
  }
`
class App extends Component {
  componentDidMount() {
    this.props.dispatch(getProducts())
    this.props.dispatch(getProductCategories())
  }
  render() {
    const isAuthenticated = this.props.session.isAuthenticated
    return (
      <Container>
        <header>
          <Route path="/" component={Navbar} />
        </header>
        <main>
          <Route exact={true} path="/" component={Homepage} />
          <Route exact={true} path="/product-index" component={ProductIndex} />
          <Route exact={true} path="/product/:id" component={ProductShow} />
        </main>
        <footer>
          <Route path="/" component={Footer} />
        </footer>
        {/** <Route exact={true} path="/" render={ 
          isAuthenticated ? showUserHome : showGuestHome} />**/}
      </Container>
    )
  }
}

const mapState = state => {
  return {
    session: state.sessionData
  }
}

export default withRouter(connect(mapState)(App))
