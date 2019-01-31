import React, { Component } from 'react';
import './App.scss';

import NavComponent from './Components/NavComponent';
import HeaderComponent from './Components/Header';

class App extends Component {
  render() {
    return (
      <div>
        <HeaderComponent />
        <NavComponent />
      </div>
    );
  }
}

export default App;
