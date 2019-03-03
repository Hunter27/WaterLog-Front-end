import React from 'react';
import { Polyline, Marker, Popup } from 'react-leaflet';
import { sensorFaultIcon, sensorOkLightIcon, sensorOkDarkerIcon } from './icons/MapIcons';

const images = {
	tank_yellow: 'images/tank-yellow.png',
	tank_orange: 'images/tank-orange.png',
	tank_green: 'images/tank-green.png',
	tank_red: 'images/tank-red.png'
};

export const getTankImage = (percent) => {
	if (percent === 0) return images.tank_red;
	else if (percent >= 1 && percent <= 40) return images.tank_yellow;
	else if (percent >= 41 && percent <= 79) return images.tank_orange;
	else if (percent >= 80 && percent <= 100) return images.tank_green;
};

const alertImages = {
	low: 'images/low_severity.png',
	medium: 'images/medium_severity.png',
	high: 'images/high_severity.png'
};

export const formatDate = (date) => {
	var d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return [ month, day, year ].join('/');
};

export const getStatusIcon = (severity) => {
	switch (severity.toLowerCase()) {
		case 'high':
			return alertImages.high;
		case 'low':
			return alertImages.low;
		case 'medium':
			return alertImages.medium;
		default:
			return null;
	}
};

export const getSensorLayout = (id) => {
	const sensors = [];
	if (id === 1) {
		sensors.push(id);
		sensors.push(id + 1);
		sensors.push(id + 2);
	} else if (id === 6) {
		sensors.push(id - 2);
		sensors.push(id - 1);
		sensors.push(id);
	} else {
		sensors.push(id - 1);
		sensors.push(id);
		sensors.push(id + 1);
	}
	return sensors;
};

export function generateMapIcons(
	{ segments, markers },
	simpleView,
	options = {
		colors: {
			darkerColor: '#4F5B62',
			errorColor: '#56ccf7',
			lighterColor: '#93a4ae'
		},
		circleSize: 7,
		lineWeight: 5
	}
) {
	const defaultColor = simpleView ? options.colors.darkerColor : options.colors.lighterColor;
	if (!segments || !markers) {
		return <div />;
	}
	return segments.map((segment) => {
		const sensorIn = markers.find((marker) => marker.id === segment.senseIDIn);
		const sensorOut = markers.find((marker) => marker.id === segment.senseIDOut);
		if (!sensorIn || !sensorOut) {
			return <div />;
		}
		const validSensor = [ 'id', 'lat', 'lon', 'status' ];

		if (Object.keys(sensorIn) === validSensor || Object.keys(sensorOut) === validSensor) {
			return <div />;
		}
		let defaultIcon = sensorOkLightIcon;
		if (simpleView) {
			defaultIcon = sensorOkDarkerIcon;
		}
		let sensorInColor = defaultIcon,
			sensorOutColor = defaultIcon,
			segmentColor = defaultColor;
		if (sensorIn.status.toLowerCase() === 'faulty') {
			sensorInColor = sensorFaultIcon;
		}
		if (sensorOut.status.toLowerCase() === 'faulty') {
			sensorOutColor = sensorFaultIcon;
		}
		if (segment.status.toLowerCase() === 'leak') {
			segmentColor = options.colors.errorColor;
		}

		return (
			<div>
				<Polyline
					positions={[ [ sensorIn.lat, sensorIn.lon ], [ sensorOut.lat, sensorOut.lon ] ]}
					color={segmentColor}
					weight={options.lineWeight}
				>
					<Popup>
						<span>{'segment ' + segment.id + '\n status ' + segment.status}</span>
					</Popup>
				</Polyline>
				<Marker position={[ sensorIn.lat, sensorIn.lon ]} opacity={1} key={sensorIn.id} icon={sensorInColor}>
					<Popup>
						<span>{'sensor ' + sensorIn.id + '\n status ' + sensorIn.status}</span>
					</Popup>
				</Marker>
				<Marker position={[ sensorOut.lat, sensorOut.lon ]} opacity={1} key={sensorOut.id} icon={sensorOutColor}>
					<Popup>
						<span>{'sensor ' + sensorOut.id + '\n status ' + sensorOut.status}</span>
					</Popup>
				</Marker>
			</div>
		);
	});
}

export function levelToIntensity(level, maxIntensity = 5) {
	if (!level) {
		return 0;
	}
	switch (level.toLowerCase()) {
		case 'high':
			return maxIntensity;
		case 'medium':
			return Math.ceil(maxIntensity / 2);
		case 'low':
			return 1;
		default:
			return 0;
	}
}

const southWest = [ -25.944586, 28.189546 ];
const northEast = [ -25.661871, 28.451147 ];
const heatBackgroundConst = 0.91;

export const mapOptions = {
	southWest: southWest,
	northEast: northEast,
	maxIntensity: 5,
	centerPosition: [ -25.783425, 28.336046 ],
	defaultZoom: 17,
	heatBackgroundConst: heatBackgroundConst,
	rectangleBounds: [ southWest.map((e) => e / heatBackgroundConst), northEast.map((e) => e * heatBackgroundConst) ]
};
