import React, { Component } from 'react';
import CostForecastComponent from '../Components/CostForecast'; 
import { Provider } from 'react-redux';
import store from '../Store';

class UsageComponent extends Component {
  render() {

    return <Provider store={store}> <div><CostForecastComponent id={1} /></div></Provider>;
  }
}
export default UsageComponent;
