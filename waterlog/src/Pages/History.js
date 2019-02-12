import React, { Component } from 'react';
import HistoryTable from '../Components/AlertTable';
import { Provider } from 'react-redux';
import store from '../Store';
import '../App.scss';
class HistoryComponent extends Component {
	render() {
		return (
			<Provider store={store}>
				<div className="App">
					<h1 className="alertsH1">
                        Section Alert History
					</h1>
					<HistoryTable />
				</div>
			</Provider>
		);
	}
}

export default HistoryComponent;
