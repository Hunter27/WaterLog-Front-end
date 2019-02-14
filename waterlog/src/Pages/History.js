import React, { Component } from 'react';
import HistoryTable from '../Components/HistoryTable';
import { Provider } from 'react-redux';
import store from '../Store';

class HistoryComponent extends Component {
	render() {
		return (
			<Provider store={store}>
				<div className="App">
					<h1>
					<p className="home-text">Section 2</p>
					<p className="home-text">Alert History</p>
					</h1>
					<HistoryTable />
				</div>
			</Provider>
		);
	}
}
export default HistoryComponent;
