import React, { Component } from "react";
import { Map, TileLayer, Polyline, CircleMarker, Popup } from "react-leaflet";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchMapsData } from "./../actions/MapActions";
import { fetchHeatMapsData } from "./../actions/HeatMapActions";
import Loader from "./Loader";
import Error404 from "./Error404";
import HeatmapLayer from "react-leaflet-heatmap-layer";

const backgroundColor = "#253238";
const errorColor = "#FF1744";
const lighterColor = "#4F5B62";

function generateMapIcons({ segments, markers }, simpleView) {
  const defaultColor = simpleView ? backgroundColor : lighterColor;
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
      sensorInColor = errorColor;
    }
    if (sensorOut.status.toLowerCase() === "faulty") {
      sensorOutColor = errorColor;
    }
    if (segment.status.toLowerCase() === "leak") {
      segmentColor = errorColor;
    }

    return (
      <div>
        <Polyline
          positions={[
            [sensorIn.lat, sensorIn.lon],
            [sensorOut.lat, sensorOut.lon]
          ]}
          color={segmentColor}
          weight={6}
        >
          <Popup>
            <span>
              {"segment " + segment.id + "\n status " + segment.status}
            </span>
          </Popup>
        </Polyline>
        <CircleMarker
          center={[sensorIn.lat, sensorIn.lon]}
          radius={5}
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
          radius={5}
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

const maxIntensity = 5;

function levelToIntensity(level) {
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

function getHeatMapData({ monitorsCoordinates, segmentCoordinates }) {
  let monitorMapData = monitorsCoordinates.map(mon => [mon.lat, mon.long, levelToIntensity(mon.faultLevel)]);
  let segmentMapData = segmentCoordinates.map(seg => [seg.lat, seg.long, levelToIntensity(seg.faultLevel)]);

  let heatMapData = monitorMapData.concat(segmentMapData);
  return heatMapData;
}
class MapComponent extends Component {
  componentDidMount() {
    this.props.fetchMapsData();
    this.props.fetchHeatMapsData();
  }

  constructor(props) {
    super(props);
    this.state = {
      lat: -25.783,
      lng: 28.337,
      simpleView: false,
      zoom: 17
    };
  }

  render() {
    const { error,
      loading,
      mapData,
      heatError,
      heatLoading,
      heatMapData
    } = this.props;
    if (error || heatError) {
      return <Error404 />;
    }
    if (loading || heatLoading) {
      return (
        <div>
          <Loader />
        </div>
      );
    }
    let icons, heatPoints;
    if (mapData) {
      icons = generateMapIcons(mapData, this.state.simpleView);
    } else {
      return <Error404 />;
    }
    if (heatMapData){
      heatPoints = getHeatMapData(this.props.heatMapData);
    } else {
      return <Error404 />;
    }
    const position = [this.state.lat, this.state.lng];
    return (
      <div className="map-main-div">
        <div className="map-tile-div">
          <Map center={position} zoom={this.state.zoom} zoomControl={false} maxZoom={18} >
            <HeatmapLayer
              points={heatPoints}
              longitudeExtractor={m => m[1]}
              latitudeExtractor={m => m[0]}
              intensityExtractor={m => parseFloat(m[2])}
              gradient={{ 0.2: 'green', 0.4: 'yellow', 0.8: 'red' }}
              radius={20}
              blur={10}
              max={maxIntensity} />
            {(() => {
              if (this.state.simpleView)
                return (<div>
                  <TileLayer url="http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png" />
                </div>
                );
            })()}
            {icons}
          </Map>
        </div>
        <div className="map-button-div-layer2 map-button-tab">
          <button
            className={`map-button ${this.state.simpleView ? "" : "active"}`}
            onClick={() => {
              this.setState({ simpleView: false });
            }}
          >
            Simplified
          </button>
          <button
            className={`map-button ${this.state.simpleView ? "active" : ""}`}
            onClick={() => {
              this.setState({ simpleView: true });
            }}
          >
            Live Map
          </button>
        </div>
      </div>
    );
  }
}

MapComponent.propTypes = {
  fetchMapsData: PropTypes.func.isRequired,
  mapData: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  mapData: state.maps.items,
  loading: state.maps.loading,
  error: state.maps.error,
  heatMapData: state.heatMap.items,
  heatLoading: state.heatMap.loading,
  heatError: state.heatMap.error
});

export default connect(
  mapStateToProps,
  {
    fetchMapsData,
    fetchHeatMapsData
  }
)(MapComponent);
