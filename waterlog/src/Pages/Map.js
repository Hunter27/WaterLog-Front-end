import React, { Component } from 'react';
import HistoryComponent from './History';

class MapComponent extends Component {
	render() {
		return (
			<div className="App">
				<div>
					{' '}
					<HistoryComponent id={2} />{' '}
				</div>
			</div>
		);
	}
}
export default MapComponent;
