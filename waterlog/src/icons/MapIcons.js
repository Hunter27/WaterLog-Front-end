import L from 'leaflet';
import sensorIconGray from '../images/map_sensor_icon_gray.png';
import sensorIconDarkGray from '../images/map_sensor_icon_darkgray.png';
import sensorAnimatedBlueIcon from '../images/sensor_animation_blue.gif';
import sensorHighlighter from '../images/selectedComponent.png';

export const sensorOkLightIcon = new L.icon({
  iconUrl: sensorIconGray,
  iconAnchor: new L.Point(12.5, 12.5),
  popupAnchor: new L.Point(0, -12.5),
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(25, 25)
});

export const sensorOkDarkerIcon = new L.icon({
  iconUrl: sensorIconDarkGray,
  iconAnchor: new L.Point(12.5, 12.5),
  popupAnchor: new L.Point(0, -12.5),
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(25, 25)
});

export const sensorFaultIcon = new L.icon({
  iconUrl: sensorAnimatedBlueIcon,
  iconAnchor: new L.Point(12.5, 12.5),
  popupAnchor: new L.Point(0, -12.5),
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(25, 25)
});

export const selectedComponentIcon = new L.icon({
  iconUrl: sensorHighlighter,
  iconAnchor: new L.Point(9, 9),
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(18, 18)
});
