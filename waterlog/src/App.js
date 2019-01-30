import React, { Component } from 'react';
import './App.css';

import Comp1 from './components/comp1';
import HeaderComponent from './components/Header';

class App extends Component {
  render() {
    return (
      <div>
        <HeaderComponent />
        <Comp1 />
      </div>
    );
  }
}

export default App;
