import React, { Component } from "react";
import {
  Map,
  TileLayer,
  Rectangle,
  Circle
} from "react-leaflet";
import HeatmapLayer from "react-leaflet-heatmap-layer";
import { mapOptions } from "../utils";

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
          center={this.props.focus ? this.props.focus : mapOptions.centerPosition}
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
            icons = this.props.icons;
            if(this.props.focus && icons){
              const circle = <Circle weight center={this.props.focus} radius={15} fillOpacity={0}></Circle>;
              icons.push(circle);
            }
            return icons;
          })()}
        </Map>
      </div>
    );
  }
}

export default MapComponent;
