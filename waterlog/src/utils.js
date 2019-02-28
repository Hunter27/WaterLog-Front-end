import React from "react";
import {
  Polyline,
  CircleMarker,
  Popup
} from "react-leaflet";

const alertImages = {
  low: 'images/low_severity.png',
  medium: 'images/medium_severity.png',
  high: 'images/high_severity.png'
}

export const formatDate = (date) => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [month, day, year].join('/');
}

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
  }
  else if (id === 6) {
    sensors.push(id - 2);
    sensors.push(id - 1);
    sensors.push(id);
  }
  else {
    sensors.push(id - 1);
    sensors.push(id);
    sensors.push(id + 1);
  }
  return sensors;
}

export function generateMapIcons({ segments, markers }, simpleView, options = {
  colors: {
    background: "#253238",
    errorColor: "#56ccf7",
    lighterColor: "#4F5B62"
  },
  circleSize: 7,
  lineWeight: 5
}) {
  const defaultColor = simpleView ? options.colors.backgroundColor : options.colors.lighterColor;
  if (!segments || !markers) {
    return <div />;
  }
  return segments.map(segment => {
    const sensorIn = markers.find(marker => marker.id === segment.senseIDIn);
    const sensorOut = markers.find(marker => marker.id === segment.senseIDOut);
    if (!sensorIn || !sensorOut) {
      return <div />;
    }
    const validSensor = ["id", "lat", "lon", "status"];

    if (
      Object.keys(sensorIn) === validSensor ||
      Object.keys(sensorOut) === validSensor
    ) {
      return <div />;
    }

    let sensorInColor = defaultColor,
      sensorOutColor = defaultColor,
      segmentColor = defaultColor;
    if (sensorIn.status.toLowerCase() === "faulty") {
      sensorInColor = options.colors.errorColor;
    }
    if (sensorOut.status.toLowerCase() === "faulty") {
      sensorOutColor = options.colors.errorColor;
    }
    if (segment.status.toLowerCase() === "leak") {
      segmentColor = options.colors.errorColor;
    }

    return (
      <div>
        <Polyline
          positions={[
            [sensorIn.lat, sensorIn.lon],
            [sensorOut.lat, sensorOut.lon]
          ]}
          color={segmentColor}
          weight={options.lineWeight}
        >
          <Popup>
            <span>
              {"segment " + segment.id + "\n status " + segment.status}
            </span>
          </Popup>
        </Polyline>
        <CircleMarker
          center={[sensorIn.lat, sensorIn.lon]}
          radius={options.circleSize}
          opacity={0.7}
          key={sensorIn.id}
          color={sensorInColor}
          fillOpacity={1}
        >
          <Popup>
            <span>
              {"sensor " + sensorIn.id + "\n status " + sensorIn.status}
            </span>
          </Popup>
        </CircleMarker>
        <CircleMarker
          fill={true}
          center={[sensorOut.lat, sensorOut.lon]}
          radius={options.circleSize}
          opacity={0.7}
          key={sensorOut.id}
          color={sensorOutColor}
          fillOpacity={1}
        >
          <Popup>
            <span>
              {"sensor " + sensorOut.id + "\n status " + sensorOut.status}
            </span>
          </Popup>
        </CircleMarker>
      </div>
    );
  });
}

export function levelToIntensity(level, maxIntensity = 5) {
  if (!level) { return 0; }
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

const southWest = [-25.944586, 28.189546];
const northEast = [-25.661871, 28.451147];
const heatBackgroundConst = 0.91;

export const mapOptions = {
  southWest: southWest,
  northEast: northEast,
  maxIntensity: 5,
  centerPosition: [-25.783425, 28.336046],
  defaultZoom: 17,
  heatBackgroundConst: heatBackgroundConst,
  rectangleBounds: [southWest.map(e => e / heatBackgroundConst), northEast.map(e => e * heatBackgroundConst)]
}
