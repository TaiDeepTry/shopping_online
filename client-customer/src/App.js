import './App.css';
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/MainComponent';
import MyProvider from './contexts/MyProvider';
import { NextUIProvider } from "@nextui-org/react";


class App extends Component {
  render() {
    return (
      <MyProvider>
        <NextUIProvider>
          <BrowserRouter >
            <Main />
          </BrowserRouter>
        </NextUIProvider>
      </MyProvider>
    );
  }
}


export default App;