import React, { Component } from "react";
import { Map, TileLayer } from "react-leaflet";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchMapsData, fetchPollMapsData } from "./../actions/MapActions";
import { fetchHeatMapsData } from "./../actions/HeatMapActions";
import Loader from "./Loader";
import Error404 from "./Error404";
import HeatmapLayer from "react-leaflet-heatmap-layer";
import { generateMapIcons, levelToIntensity } from "./../utils";

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
class MapComponent extends Component {
  async componentDidMount() {
    this.props.fetchMapsData();
    this.props.fetchHeatMapsData();
    this.timer = setInterval(() => {
      this.props.fetchPollMapsData()
      const { pmapData } = this.props;
      this.setState({
        iconState: generateMapIcons(pmapData),
      });

      if (this.state.iconState.length > 0) {
        this.state.contLoading = false;
      }

    }, 5000);
  }

  constructor(props) {
    super(props);
    this.state = {
      simpleView: false,
      zoom: 17,
      iconState: null,
      contLoading: true
    };
  }

  render() {
    const {
      error,
      loading,
      mapData,
      heatError,
      heatLoading,
      heatMapData,
      pmapDataError,
    } = this.props;
    if (error || heatError || pmapDataError) {
      return <Error404 />;
    }
    if (loading || heatLoading || this.state.contLoading) {
      return (
        <div>
          <Loader />
        </div>
      );
    }
    let heatPoints;
    if (mapData) {

    } else {
      return <Error404 />;
    }
    if (heatMapData) {
      heatPoints = getHeatMapData(this.props.heatMapData);
    } else {
      return <Error404 />;
    }
    return (
      <div className="map-main-div">
        <div className="map-tile-div">
          <Map
            center={centerPosition}
            maxBounds={[southWest, northEast]}
            zoom={this.state.zoom}
            zoomControl={false}
            maxZoom={18} >
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
            {this.state.iconState}
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
  fetchPollMapsData: PropTypes.func,
  mapData: PropTypes.array.isRequired,
  pmapData: PropTypes.array
};

const mapStateToProps = state => ({
  pmapData: state.pmaps.items,
  mapData: state.maps.items,
  loading: state.maps.loading,
  error: state.maps.error,
  heatMapData: state.heatMap.items,
  heatLoading: state.heatMap.loading,
  heatError: state.heatMap.error,
  pmapDataLoading: state.pmaps.loading,
  pmapDataError: state.pmaps.error
});

export default connect(
  mapStateToProps,
  {
    fetchMapsData,
    fetchPollMapsData,
    fetchHeatMapsData
  }
)(MapComponent);
