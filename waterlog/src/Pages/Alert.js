import React, { Component } from 'react';
<<<<<<< HEAD
import AlertTable from './../Components/AlertTable'


=======

import AlertTable from './../Components/AlertTable'
import {Provider} from 'react-redux';
import store from '../store';
>>>>>>> origin/feature/leakage-alert

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