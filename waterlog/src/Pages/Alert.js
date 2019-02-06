import React, { Component } from 'react';

import AlertTable from './../Components/AlertTable'
import {Provider} from 'react-redux';
import store from '../store';

class AlertComponent extends Component {
  render() {
    return (
          <div className="App">
              <h1 style={{textAlign:'center', fontFamily: 'Malayalam Sangam MN'}}>Alerts</h1>
              <AlertTable />
          </div>
    );
  }
}

export default AlertComponent;