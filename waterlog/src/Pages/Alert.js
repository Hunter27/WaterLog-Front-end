import React, { Component } from 'react';
import AlertTable from '../Components/AlertTable';
import AlertsFilter from '../Components/AlertsFilter';

class AlertComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			filterOpen: false
		};

		this.toggleFilter = this.toggleFilter.bind(this);
	}

	toggleFilter = () => {
		this.setState({
			filterOpen: !this.state.filterOpen
		});
	};

	render() {
		return (
			<div>
				<h1 className = "usage-header">Filter Alerts</h1>
				{this.state.filterOpen ? (
					<AlertsFilter close={this.toggleFilter} />
				) : (
					<AlertTable openFilter={this.toggleFilter} />
				)}
			</div>
		);
	}
}
export default AlertComponent;
