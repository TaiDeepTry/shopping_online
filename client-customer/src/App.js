import './App.css';
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/MainComponent';
import MyProvider from './contexts/MyProvider';
import { NextUIProvider } from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";


class App extends Component {
  render() {
    return (
      <MyProvider>
        <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="light">
          <BrowserRouter >
            <Main />
          </BrowserRouter>
          </NextThemesProvider>
        </NextUIProvider>
      </MyProvider>
    );
  }
}


export default App;