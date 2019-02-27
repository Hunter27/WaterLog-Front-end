import React, { Component } from "react";
import { Map, TileLayer } from "react-leaflet";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchMapsData } from "../actions/MapActions";
import { fetchHeatMapsData } from "../actions/HeatMapActions";
import Loader from "./Loader";
import Error404 from "./Error404";
import HeatmapLayer from "react-leaflet-heatmap-layer";
import { generateMapIcons, levelToIntensity } from "../utils";

const southWest = [-25.784510, 28.334360];
const northEast = [-25.782110, 28.338325];
const maxIntensity = 5;
const centerPosition = [-25.783425, 28.336046];

function getHeatMapData({ monitorsCoordinates, segmentCoordinates }) {
  let monitorMapData = monitorsCoordinates.map(mon => [mon.lat, mon.long, levelToIntensity(mon.faultLevel, maxIntensity)]);
  let segmentMapData = segmentCoordinates.map(seg => [seg.lat, seg.long, levelToIntensity(seg.faultLevel, maxIntensity)]);

  let heatMapData = monitorMapData.concat(segmentMapData);
  return heatMapData;
}
class MapFullScreenComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      simpleView: false
    };
  }

  componentDidMount() {
    this.props.fetchMapsData();
    this.props.fetchHeatMapsData();
  }

  render() {
    const {
      error,
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
    if (heatMapData) {
      heatPoints = getHeatMapData(this.props.heatMapData);
    } else {
      return <Error404 />;
    }

    return (
      <div className="map_main-div-fullscreen">
        <div className="map-button-div-layer2-fullscreen map-button-tab">
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
          <img />
        </div>
        <div className="map-tile-div-fullscreen">
          <Map
            center={centerPosition}
            maxBounds={[southWest, northEast]}
            zoom={17}
            zoomControl={false}
            maxZoom={18}
            minZoom={15}
            style={{ height: '100vh' }} >

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
      </div>
    );
  }
}

MapFullScreenComponent.propTypes = {
  fetchMapsData: PropTypes.func.isRequired
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
)(MapFullScreenComponent);
