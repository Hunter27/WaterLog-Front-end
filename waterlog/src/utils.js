import {
  LowStatusIcon,
  MediumStatusIcon,
  HighStatusIcon
} from './Components/AlertBox';
import {
  Polyline,
  CircleMarker,
  Popup
} from "react-leaflet";
import React from "react";

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
      return HighStatusIcon();
    case 'low':
      return LowStatusIcon();
    case 'medium':
      return MediumStatusIcon();
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