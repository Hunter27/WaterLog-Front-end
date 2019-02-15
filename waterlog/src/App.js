import React, { Component } from 'react';
import './App.scss';
import NavComponent from './Components/NavComponent';
import { Provider } from 'react-redux';
import store from './Store';

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <div>
          <NavComponent />
        </div>
      </Provider>
    );
  }
}
export default App;
