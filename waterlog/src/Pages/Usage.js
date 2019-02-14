import React, { Component } from 'react';
import CostForecastComponent from '../Components/CostForecast';
import {ForecastType} from './../actions/CostForecastActions'
import { Provider } from 'react-redux';
import store from '../Store';

class UsageComponent extends Component {
	render() {
		return (
			<Provider store={store}>
				<div>
					<CostForecastComponent type={ForecastType.MONTHLY} />
				</div>
			</Provider>
		);
	}
}
export default UsageComponent;
