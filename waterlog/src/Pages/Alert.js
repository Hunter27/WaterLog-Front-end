import React, { Component } from 'react';

import AlertTable from '../Components/AlertTable_';
import { Provider } from 'react-redux';
import store from '../store';

class AlertComponent extends Component {
	render() {
		return (
			<Provider store={store}>
				<div className="App">
					<h1 style={{ textAlign: 'center', font: 'Malayalam Sangam MN', color: 'white', padding: '5px' }}>
						Alerts
					</h1>
					<AlertTable />
				</div>
			</Provider>
		);
	}
}

export default AlertComponent;
