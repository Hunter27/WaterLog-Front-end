import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import './../Stylesheets/_map.scss';
import {sensorFaultIcon, sensorOkIcon} from './../icons/MapIcons';

var markers = [
	{ lat: -25.782473, lon: 28.338061 },
	{ lat: -25.782454, lon: 28.337993 },
	{ lat: -25.782456, lon: 28.337866 },
    { lat: -25.782634, lon: 28.338039 },
    { lat: -25.783408, lon: 28.336180}
];

export default class MapComponent extends Component {
	constructor() {
		super();
		this.state = {
			lat: -25.782378,
			lng: 28.338144,
			zoom: 19
		};
	}

	render() {
		const position = [ this.state.lat, this.state.lng ];
		return (
			<Map center={position} zoom={this.state.zoom}>
				<TileLayer
					attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
					url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
				/>
				{markers.map((marker, index) => (
					<Marker position={[ marker.lat, marker.lon ]} icon={sensorFaultIcon}>
						<Popup>
							<span>Marker with index {index}</span>
						</Popup>
					</Marker>
				))}
			</Map>
		);
	}
}
