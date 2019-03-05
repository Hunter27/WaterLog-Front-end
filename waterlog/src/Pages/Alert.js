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
				{this.state.filterOpen ? (
					<AlertsFilter close={this.toggleFilter} hist={this.props.history}/>
				) : (
					<AlertTable openFilter={this.toggleFilter} hist={this.props.history}/>
				)}
			</div>
		);
	}
}
export default AlertComponent;
