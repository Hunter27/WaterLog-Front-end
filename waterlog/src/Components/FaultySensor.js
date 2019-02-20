import React, { Component } from 'react';
import Link from './Link';
import Button from './Button';
import SensorDiagram from './SensorDiagram'

export default class FaultySensor extends Component {
	constructor(){
		super();
		this.handleResolveClick = this.handleResolveClick.bind(this);
		this.state = {
			mapExpanded: false,
			leakResolved: false,
		};
	}

	handleMapExpand() {
		this.setState({
			mapExpanded: !this.state.mapExpanded
		});
	}

	handleResolveClick() {
		this.setState({
			leakResolved: !this.state.leakResolved
		});
	}

	render() {
		return (
			<div>
				<div>
					<h2>Sensor {this.props.match.params.id}</h2>
					<p>{0}/{0}/hr water flow </p>
					<p>(surrounding sensors have 100% waterflow)</p>
				</div>
				<img id="map-toggle"
					src={this.state.mapExpanded === false ? 'images/map_expand.png' : 'images/map_close.png'}
						alt="segment-map"
						onClick={() => this.handleMapExpand()}
					/>
					<hr />
					<Link to={`/alert/segment-history/${alert.entityId}`} text="component history" />
					<SensorDiagram />
					<Button text="RESOLVE" click={this.handleResolveClick} />
					<small>the problem if fixed, click here</small>
			</div>
		);
	}
}
