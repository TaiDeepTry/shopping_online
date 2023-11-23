import React, { Component } from 'react';
import MyContext from './MyContext';

class MyProvider extends Component {
  constructor(props) {
    super(props);
    this.state = { // global state
      // variables
      token: '',
      customer: null,
      mycart: [],
      // functions
      setToken: this.setToken,
      setCustomer: this.setCustomer,
      setMycart: this.setMycart
    };
  }
  setToken = (value) => {
    this.setState({ token: value });
  }
  setCustomer = (value) => {
    this.setState({ customer: value });
  }
  render() {
    return (
      <MyContext.Provider value={this.state}>
        {this.props.children}
      </MyContext.Provider>
    );
  }
  setMycart = (value) => {
    this.setState({ mycart: value });
  }
}
export default MyProvider;