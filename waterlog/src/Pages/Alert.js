import React, { Component } from 'react';
import Demo from './../Components/AlertTable'



class AlertComponent extends Component {
  render() {
    return (
          <div className="App">
              <h1 style={{textAlign:'center', fontFamily: 'Malayalam Sangam MN'}}>Alerts</h1>
              <Demo />
          </div>
    );
  }
}

export default AlertComponent;