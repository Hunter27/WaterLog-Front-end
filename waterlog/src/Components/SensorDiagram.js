import React, { Component } from 'react';
import { getSensorLayout } from './../utils';

export default class SensorDiagram extends Component {
	render() {
		const faultySensor = this.props.sensorId;
		const sensorSetup = getSensorLayout(parseInt(faultySensor));
		const resolvedStatus = this.props.status;
		return (
			<div id="sensor-diagram">
				<div id="line" />
				<div id="first" className="sensor-wrapper">
					<div
						className={`sensor ${parseInt(faultySensor) === sensorSetup[0]
							? resolvedStatus == 1 ? 'resolved-sensor' : 'faulty'
							: ''}`}
					>
						<p>{sensorSetup[0]}</p>
					</div>
					<div
						className={`flow ${parseInt(faultySensor) === sensorSetup[0]
							? resolvedStatus == 1 ? 'resolved-text' : 'faulty-text'
							: ''}`}
					>
						<p>{100}%</p>
						<p>water flow</p>
					</div>
				</div>
				<div id="mid" className="sensor-wrapper">
					<div
						className={`sensor ${parseInt(faultySensor) === sensorSetup[1]
							? resolvedStatus == 1 ? 'resolved-sensor' : 'faulty'
							: ''}`}
					>
						<p>{sensorSetup[1]}</p>
					</div>
					<div
						className={`flow ${parseInt(faultySensor) === sensorSetup[1]
							? resolvedStatus == 1 ? 'resolved-text' : 'faulty-text'
							: ''}`}
					>
						<p>{100}%</p>
						<p>water flow</p>
					</div>
				</div>

				<div id="last" className="sensor-wrapper">
					<div
						className={`sensor ${parseInt(faultySensor) === sensorSetup[2]
							? resolvedStatus == 1 ? 'resolved-sensor' : 'faulty'
							: ''}`}
					>
						<p>{sensorSetup[2]}</p>
					</div>
					<div
						className={`flow ${parseInt(faultySensor) === sensorSetup[2]
							? resolvedStatus == 1 ? 'resolved-text' : 'faulty-text'
							: ''}`}
					>
						<p>{100}%</p>
						<p>water flow</p>
					</div>
				</div>
			</div>
		);
	}
}
