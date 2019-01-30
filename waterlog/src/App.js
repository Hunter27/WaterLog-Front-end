import React, { Component } from 'react';
import './App.css';

import Comp1 from './Components/comp1';
import HeaderComponent from './Components/Header';

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
