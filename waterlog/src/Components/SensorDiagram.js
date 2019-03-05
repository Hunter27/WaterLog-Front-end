import React, { Component } from 'react';
import { getSensorLayout } from './../utils';

export default class SensorDiagram extends Component {
	render() {
		const { sensorId, status } = this.props;
		const sensorSetup = getSensorLayout(parseInt(sensorId));
		return (
			<div id="sensor-diagram">
				<div id="line" />
				<div id="first" className="sensor-wrapper">
					<div
						className={`sensor ${parseInt(sensorId) === sensorSetup[0]
							? (status ? 'sensor-diagram-resolved' : 'sensor-diagram-unresolved')
							: ''}`}
					>
						<p>{sensorSetup[0]}</p>
					</div>
					<div
						className={`flow ${parseInt(sensorId) === sensorSetup[0]
							? (status ? 'resolved-text' : 'faulty-text')
							: ''}`}
					>
						<p>{100}%</p>
						<p>water flow</p>
					</div>
				</div>
				<div id="mid" className="sensor-wrapper">
					<div
						className={`sensor ${parseInt(sensorId) === sensorSetup[1]
							? (status ? 'sensor-diagram-resolved' : 'sensor-diagram-unresolved')
					: ''}`}
			>
						<p>{sensorSetup[1]}</p>
					</div>
					<div
						className={`flow ${parseInt(sensorId) === sensorSetup[1]
							? (status ? 'resolved-text' : 'faulty-text')
							: ''}`}
					>
						<p>{100}%</p>
						<p>water flow</p>
					</div>
				</div>

				<div id="last" className="sensor-wrapper">
					<div
						className={`sensor ${parseInt(sensorId) === sensorSetup[2]
							? (status ? 'sensor-diagram-resolved' : 'sensor-diagram-unresolved')
							: ''}`}
					>
						<p>{sensorSetup[2]}</p>
					</div>
					<div
						className={`flow ${parseInt(sensorId) === sensorSetup[2]
							? (status ? 'resolved-text' : 'faulty-text')
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
