import React, { Component } from 'react';
import './App.scss';
import NavComponent from './Components/NavComponent';
import HeaderComponent from './Components/Header';
import { Provider } from 'react-redux';
import store from './Store';

class App extends Component {

  render() {
    return (
      <Provider store={store}>
      <div>
        <HeaderComponent />
        <NavComponent />
      </div>
      </Provider>
    );
  }
}

export default App;

