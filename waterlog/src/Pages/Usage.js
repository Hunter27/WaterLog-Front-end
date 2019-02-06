import React, { Component } from 'react';
import MonitorsComponent from './../Components/monitors';
import Sensors from './../Components/Sensors';
import {Provider} from 'react-redux';
import store from '../store';

class UsageComponent extends Component {
  render() {
    return ( 
        <Provider store={store}>
        <div className="App">
        <Sensors/>
        </div>
      </Provider>
       
    );
  }
}

export default UsageComponent;