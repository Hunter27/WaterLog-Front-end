import React, { Component } from 'react';
import { getStatusIcon } from '../utils';

class AlertsFilter extends Component {
	constructor(props) {
		super(props);

		this.state = {
			segmentFilterOpen: false,
			sensorFilterOpen: false,
			severityFilterOpen: false,
			segmentNumber: 0,
			sensorType: 0,
			sensorNumber: 0,
			severity: 0
		};

		this.resetFilter = this.resetFilter.bind(this);
		this.submitFilter = this.submitFilter.bind(this);
		this.handleSeverityClick = this.handleSeverityClick.bind(this);
	}
	severity = [ 'low', 'medium', 'high' ];

	handleSeverityClick = (severityLevel) => {
		this.setState({
			severity: severityLevel
		});
	};

	resetFilter = () => {
		this.segmentCheckbox.checked = false;
		this.sensorCheckbox.checked = false;
		this.severityCheckbox.checked = false;

		this.setState({
			segmentFilterOpen: false,
			sensorFilterOpen: false,
			severityFilterOpen: false,
			segmentNumber: 0,
			sensorType: 0,
			sensorNumber: 0,
			severity: 0
		});
	};

	submitFilter = () => {
		if (this.state.segmentFilterOpen) {
			this.setState({
				segmentNumber: parseInt(this.segmentInput.value)
			});
		}

		if (this.state.sensorFilterOpen) {
			if (this.state.sensorType === 1)
				this.setState({
					sensorNumber: parseInt(this.pipeSensorInput.value)
				});

			if (this.state.sensorType === 2)
				this.setState({
					sensorNumber: parseInt(this.tankSensorInput.value)
				});
		}
		this.props.close();
	};

	render() {
		return (
			<div>
				<h1 className="alerts-header">Alerts Filter</h1>
				<div className="filter-contents">
					<div>
						<input
							type="checkbox"
							ref={(cb) => (this.segmentCheckbox = cb)}
							onChange={() => {
								this.setState({ segmentFilterOpen: !this.state.segmentFilterOpen });
							}}
							id="segment-filter"
							name="segment-filter"
						/>
						<label for="segment-filter">Segment</label>
					</div>
					{this.state.segmentFilterOpen ? (
						<input
							type="number"
							ref={(input) => (this.segmentInput = input)}
							defaultValue="0"
							placeholder="Type a number"
							min="0"
							max="10"
						/>
					) : null}
					<hr />
					<div>
						<div>
							<input
								type="checkbox"
								ref={(cb) => (this.sensorCheckbox = cb)}
								onChange={() => {
									this.setState({ sensorFilterOpen: !this.state.sensorFilterOpen });
								}}
								id="sensor-filter"
								name=""
								value="sensor-filter"
							/>
							<label for="sensor-filter">Sensor</label>
						</div>
						{this.state.sensorFilterOpen ? (
							<ul>
								<li>
									<div>
										<input
											type="radio"
											id="tank-filter"
											name="tank-pipe-filter"
											value="2"
											onChange={(e) => {
												this.setState({ sensorType: parseInt(e.target.value) });
											}}
										/>
										<label for="tank-filter">tank sensor</label>
									</div>
									{this.state.sensorType === 2 ? (
										<input
											type="number"
											ref={(input) => (this.tankSensorInput = input)}
											defaultValue="0"
											placeholder="Type a number"
											min="0"
											max="10"
										/>
									) : null}
								</li>
								<li>
									<div>
										<input
											type="radio"
											id="pipe-filter"
											name="tank-pipe-filter"
											value="1"
											onChange={(e) => {
												this.setState({ sensorType: parseInt(e.target.value) });
											}}
										/>
										<label for="pipe-filter">pipe sensor</label>
									</div>
									{this.state.sensorType === 1 ? (
										<input
											type="number"
											ref={(input) => (this.pipeSensorInput = input)}
											defaultValue="0"
											placeholder="Type a number"
											min="0"
											max="10"
										/>
									) : null}
								</li>
							</ul>
						) : null}
					</div>
					<hr />
					<div>
						<input
							type="checkbox"
							ref={(cb) => (this.severityCheckbox = cb)}
							id="severity-filter"
							name="severity-filter"
							onChange={() => {
								this.setState({ severityFilterOpen: !this.state.severityFilterOpen });
							}}
						/>
						<label for="severity-filter">Severity</label>
					</div>
					{this.state.severityFilterOpen ? (
						this.severity.map((item, index) => (
							<div onClick={() => this.handleSeverityClick(index + 1)} className="severity-selector" key={index}>
								{item}
								<img src={getStatusIcon(item)} alt="severity indicator" />
							</div>
						))
					) : null}
					<hr />
					<button id="reset-filter" onClick={this.resetFilter}>
						Clear All
					</button>
					<button id="submit-filter" onClick={this.submitFilter}>
						DONE
					</button>
				</div>
			</div>
		);
	}
}

export default AlertsFilter;
