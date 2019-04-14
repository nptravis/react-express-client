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
import { withRouter } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: 5px;

  & > header {
    flex: 1 1 10%;
  }
  & > main {
    flex: 1 1 70%;
  }
  & > footer {
    flex: 1 1 20%;
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
