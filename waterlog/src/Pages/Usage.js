import React, { Component } from 'react'; 
import Sensors from './../Components/Sensors';
import Segments from './../Components/Segments';
import {Provider} from 'react-redux';
import store from '../store';

class UsageComponent extends Component {
  render() {
    return ( 
     
        <Provider store={store}>
        <div className="App">
        <h1>List of Components</h1>
        <Sensors/> 
        <hr/>
        <Segments/>
        </div>
      </Provider> 
    );
  }
}

export default UsageComponent;