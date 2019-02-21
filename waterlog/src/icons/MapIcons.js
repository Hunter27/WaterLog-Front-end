import L from 'leaflet';

export const sensorOkIcon = new L.icon({
	iconUrl: require('../images/green_sensor_dark.gif'),
	iconAnchor: null,
	popupAnchor: null,
	shadowUrl: null,
	shadowSize: null,
	shadowAnchor: null,
	iconSize: new L.Point(60, 75)
});

export const sensorFaultIcon = new L.icon({
	iconUrl: require('../images/redCircleFaultMarker.png'),
	iconAnchor: null,
	popupAnchor: null,
	shadowUrl: null,
	shadowSize: null,
	shadowAnchor: null,
	iconSize: new L.Point(60, 75)
});

export const sensorRedIcon = new L.icon({
	iconUrl: require('../images/Red_sensor_dark.gif'),
	iconAnchor: null,
	popupAnchor: null,
	shadowUrl: null,
	shadowSize: null,
	shadowAnchor: null,
	iconSize: new L.Point(60, 75)
});
