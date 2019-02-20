import React, { Component } from 'react';
import ProgressBarComponent from './ProgressBar';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

export default class InformationComponent extends Component {
	percentage = this.props.percentage;
	moneyLost = this.props.moneyLost;
	waterLost = this.props.waterLost;

	constructor(props) {
		super(props);
		this.state = {
			percentage: 47,
			moneyLost: 7321.45,
			waterLost: 985
		};
	}
	render() {
		return (
			<div className="card bg-light container p-2 wastageInfo">
				<h5 className="card-title text-center"> Wastage </h5>
				<div className="card-body">
					<div className="row">
						<div className="text-center right information">
							<h6> Money lost </h6>
							<p> R {this.state.moneyLost} </p>
						</div>
						<div className="text-center information">
							<h6> Total water lost </h6>
							<p> {this.state.waterLost} l / hour </p>
						</div>
					</div>
					<ProgressBarComponent percentage={this.state.percentage} />
				</div>
			</div>
		);
	}
}
