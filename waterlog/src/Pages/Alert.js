import React, { Component } from 'react';
//import { BrouserRouter as Router, Route, Link } from "react-router-dom";
import Notice from '../components/Notice';
import NoticeForm from '../components/NoticeForm';
import {Provider} from 'react-redux';
import store from '../store';

class AlertComponent extends Component {
  render() {
    return (
        <Provider store={store}>
          <div className="App">
            <header className="App-header">
               
              <NoticeForm/>
              <hr/>
              <Notice/> 
              
            </header>
          </div>
        </Provider>
    );
  }
}

export default AlertComponent;