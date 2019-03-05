import L from 'leaflet';

export const sensorOkLightIcon = new L.icon({
  iconUrl: require('../images/map_sensor_icon_gray.png'),
  iconAnchor: new L.Point(12.5, 12.5),
  popupAnchor: new L.Point(0, -12.5),
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(25, 25)
});

export const sensorOkDarkerIcon = new L.icon({
  iconUrl: require('../images/map_sensor_icon_darkgray.png'),
  iconAnchor: new L.Point(12.5, 12.5),
  popupAnchor: new L.Point(0, -12.5),
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(25, 25)
});

export const sensorFaultIcon = new L.icon({
  iconUrl: require('../images/sensor_animation_blue.gif'),
  iconAnchor: new L.Point(12.5, 12.5),
  popupAnchor: new L.Point(0, -12.5),
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(25, 25)
});

export const selectedComponentIcon = new L.icon({
  iconUrl: require('../images/selectedComponent.png'),
  iconAnchor: new L.Point(9, 9),
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(18, 18)
});
