import React, { Component } from 'react';
import '../Stylesheets/_progressBar.scss';
export default class ProgressBarComponent extends Component {
	percentage = this.props.percentage;
	constructor(props) {
		super(props);

		this.state = {
			percentage: this.percentage
		};
	}
	render() {
		return (
			<div className="progressBar">
				<ProgressBar percentage={this.state.percentage} />
			</div>
		);
	}
}

const ProgressBar = (props) => {
	return (
		<div>
			<div className="progress-bar">
				<Filler percentage={props.percentage} />
			</div>
		</div>
	);
};

export const Filler = (props) => {
	return <div className="filler" style={{ width: `${props.percentage}%` }} />;
};
