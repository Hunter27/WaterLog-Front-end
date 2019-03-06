import React, { Component } from "react";
import {
  Map,
  TileLayer,
  Rectangle,
  Marker,
  Polyline
} from "react-leaflet";
import HeatmapLayer from "react-leaflet-heatmap-layer";
import { mapOptions } from "../utils";
import { selectedComponentIcon } from "../icons/MapIcons";
import { Globals } from "../Globals";

const components = Globals.COMPONENT_TYPES;
const failSafeMarker = <Marker position={[-33.989400, 18.637909]} icon={selectedComponentIcon} />;

const generateHighlightIcon = (mapData, type, id) => {
  const sensors = mapData.markers;
  const segments = mapData.segments;
  const tanks = mapData.tanks;
  let coordinates = [null, null];
  if (!sensors || !segments || !tanks) {
    return failSafeMarker;
  }
  switch (type) {
    case components.SEGMENT:
      const segment = segments.find(segment => (id === segment.id));
      const sensor1 = sensors.find(sensor => segment.senseIDIn === sensor.id);
      const sensor2 = sensors.find(sensor => segment.senseIDOut === sensor.id);
      if (!segment || !sensor1 || !sensor2) {
        return failSafeMarker;
      }
      coordinates = [];
      return <Polyline
        positions={[[sensor1.lat, sensor1.lon], [sensor2.lat, sensor2.lon]]}
        color={'#57CCF7'}
        weight={3}
      />;
    case components.SENSOR:
      coordinates = sensors.find(sensor => (id === sensor.id));
      if (!coordinates) {
        return failSafeMarker;
      }
      return <Marker
        position={coordinates}
        icon={selectedComponentIcon} />;
    case components.TANK:
      const _tank = tanks.find(tank => (id === tank.id));
      if (!_tank) {
        return failSafeMarker;
      }
      coordinates = [_tank.lat, _tank.lon]
      return <Marker
        position={coordinates}
        icon={selectedComponentIcon} />;
    default:
      return failSafeMarker;
  }
}
class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.reCenter = this.reCenter.bind(this);
    this.ref = this.refs.map;
  }

  reCenter() {
    const map = this.refs.map.leafletElement;
    map.setView(mapOptions.centerPosition, mapOptions.defaultZoom);
  }

  render() {
    return (
      <div>
        <Map
          ref='map'
          center={mapOptions.centerPosition}
          maxBounds={[mapOptions.southWest, mapOptions.northEast]}
          zoom={this.props.currentZoom ? this.props.currentZoom : 17}
          zoomControl={false}
          maxZoom={this.props.maxZoom ? this.props.maxZoom : 18}
          minZoom={this.props.minZoom ? this.props.minZoom : 14}
          attributionControl={false}
          style={{ height: this.props.height ? this.props.height : '30vh' }} >
          {(() => {
            if (this.props.setView)
              return (<div>
                <TileLayer url="http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png" />
                {(() => {
                  if (this.props.heatView) {
                    return (
                      <div>
                        <Rectangle bounds={mapOptions.rectangleBounds} color={'#beecff'} opacity={0.5} />
                        <HeatmapLayer
                          points={this.props.heatIcons}
                          longitudeExtractor={m => m[1]}
                          latitudeExtractor={m => m[0]}
                          intensityExtractor={m => parseFloat(m[2])}
                          gradient={{ 0.25: '#5ad4de', 0.5: '#6ade5a', 0.75: '#d2de5a', 1: '#de765a' }}
                          radius={40}
                          blur={15}
                          max={mapOptions.maxIntensity} />
                      </div>);
                  }
                })()}
              </div>
              );
          })()}
          {(() => {
            let icons = [];
            if (this.props.focus && this.props.mapsData) {
              const icon = generateHighlightIcon(this.props.mapsData, this.props.focus.type, this.props.focus.id);
              icons.push(icon);
            }
            if (this.props.icons) {
              return this.props.icons.concat(icons);
            }
            return icons;
          })()}
        </Map>
      </div>
    );
  }
}

export default MapComponent;
