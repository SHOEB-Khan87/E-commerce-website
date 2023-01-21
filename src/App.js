import React, { Component } from 'react'
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
}
  from "react-router-dom"
import Home from './pages/Home';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';
import Description from './pages/Description';
import { connect } from 'react-redux';
import Address from './pages/Address';
class App extends Component {

  render() {

    return (
      <>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact key="/" path="/" element={<Home home="products" />} />

            <Route exact key="men's clothing" path="/men's clothing" element={<Home category="men's clothing" />} />
            <Route exact key="jewelery" path='/jewelery' element={<Home category="jewelery" />} />
            <Route exact key="electronics" path='/electronics' element={<Home category="electronics" />} />
            <Route exact key="women's clothing" path="/women's clothing" element={<Home category="women's clothing" />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Description" element={<Description />} />
            <Route path="/Address" element={<Address />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }

}

function mapStateToProps(state) {
  return {
    cartState: state.Cart_Reducer.productCart
  }
}

export default connect(mapStateToProps)(App);
