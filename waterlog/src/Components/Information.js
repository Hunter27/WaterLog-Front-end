import React, { Component } from 'react';
import ProgressBarComponent from './ProgressBar';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../Stylesheets/_home.scss';

//displays the wastage information on the home page
export default class InformationComponent extends Component {
	percentage = this.props.percentage;
	moneyLost = this.props.moneyLost;
	waterLost = this.props.waterLost;

	constructor(props) {
		super(props);

		this.state = {
			percentage: 0,
			moneyLost: 0,
			waterLost: 0		};
	}
	render() {
		return (
			<div className="card container infomation">
				<h5 className="card-title text-center">Wastage</h5>
				<div className="card-body">
					<div className="row">
						<div className="text-center information">
							<h6>Money lost</h6>
							<p> R {this.state.moneyLost}</p>
						</div>

						<div className="text-center information">
							<h6> Total water lost</h6>
							<p> {this.state.waterLost} l/hour</p>
						</div>
					</div>
					<ProgressBarComponent percentage={this.state.percentage}/>
				</div>
			</div>
		);
	}
}
