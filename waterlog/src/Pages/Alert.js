import React, { Component } from 'react';
import AlertTable from '../Components/AlertTable';
import { Provider } from 'react-redux';
import store from '../Store';
import { NavLink } from 'react-router-dom';

class AlertComponent extends Component {
	render() {
		return (
			<Provider store={store}>
				<div className="App">
					<h1 className="alertsH1">
						Alerts
					</h1>
					<AlertTable />
					<NavLink to="/alert/segment/2">Segment 2</NavLink>
				</div>
			</Provider>
		);
	}
}
export default AlertComponent;
