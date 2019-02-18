import React, { Component } from 'react';
import HistoryTable from '../Components/HistoryTable';

class HistoryComponent extends Component {
	render() {
		return (
				<div className="App">
					<h1>
						<p className="home-text">Section 2</p>
						<p className="home-text">Alert History</p>
					</h1>
					<img src="images/map_expand.png" width="50px" alt="map expand" />
					<hr />
					<br />
					<HistoryTable />
				</div>
		);
	}
}
export default HistoryComponent;
