import React, { Component } from 'react'
import './App.css'
import { getInitialData } from './actions/initialData'
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
import CartContainer from './containers/CartContainer'

const Container = styled.div`
  padding: 10px;
  background-color: ${docColors.lightGrey};
  min-height: 100vh;

  & > header {
    min-height: 10%;
  }
  & > main {
    min-height: 80%;
    width: 95%;
    margin: 0 auto;
  }
  & > footer {
    text-align: center;
    min-height: 10%;
  }
`
class App extends Component {
  componentDidMount() {
    this.props.dispatch(getInitialData())
  }

  renderLoading() {
    return <div>Loading...</div>
  }

  renderApp() {
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
          <Route exact={true} path="/cart" component={CartContainer} />
        </main>
        <footer>
          <Route path="/" component={Footer} />
        </footer>
        {/** <Route exact={true} path="/" render={ 
          isAuthenticated ? showUserHome : showGuestHome} />**/}
      </Container>
    )
  }

  renderError() {
    return <div>Oops, please try again</div>
  }

  render() {
    if (this.props.loading) {
      return this.renderLoading()
    } else if (this.props.products[1]) {
      return this.renderApp()
    } else {
      return this.renderError()
    }
  }
}

const mapState = state => {
  return {
    session: state.sessionData,
    loading: state.initialData.loading,
    products: state.initialData.products
  }
}

export default withRouter(connect(mapState)(App))
