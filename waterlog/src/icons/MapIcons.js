import L from 'leaflet';

export const sensorOkIcon = new L.icon({
	iconUrl: require('../images/greenCircleMarker.png'),
	//iconRetinaUrl: require('../img/marker-pin-person.svg'),
	iconAnchor: null,
	popupAnchor: null,
	shadowUrl: null,
	shadowSize: null,
	shadowAnchor: null,
	iconSize: new L.Point(60, 75)
});

export const sensorFaultIcon = new L.icon({
	iconUrl: require('../images/redCircleFaultMarker.png'),
	//iconRetinaUrl: require('../img/marker-pin-person.svg'),
	iconAnchor: null,
	popupAnchor: null,
	shadowUrl: null,
	shadowSize: null,
	shadowAnchor: null,
	iconSize: new L.Point(60, 75)
});

export const sensorRedIcon = new L.icon({
	iconUrl: require('../images/redCircleMarker.png'),
	//iconRetinaUrl: require('../img/marker-pin-person.svg'),
	iconAnchor: null,
	popupAnchor: null,
	shadowUrl: null,
	shadowSize: null,
	shadowAnchor: null,
	iconSize: new L.Point(60, 75)
});