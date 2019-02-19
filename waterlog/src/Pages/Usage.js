import React, { Component } from 'react';
import UsageCostComponent from './../Components/Usage-cost';

class UsageComponent extends Component {
	render() {
		return (
			<div>
				<p>Usage page</p>
				<UsageCostComponent />
			</div>
		);
	}
}
export default UsageComponent;
