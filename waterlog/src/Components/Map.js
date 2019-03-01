import React, { Component } from "react";
import {
  Map,
  TileLayer,
  Rectangle
} from "react-leaflet";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  fetchMapsData,
  fetchPollMapsData
} from "./../actions/MapActions";
import { fetchHeatMapsData } from "./../actions/HeatMapActions";
import Loader from "./Loader";
import Error404 from "./Error404";
import HeatmapLayer from "react-leaflet-heatmap-layer";
import {
  generateMapIcons,
  levelToIntensity,
  mapOptions
} from "./../utils";

function getHeatMapData({ monitorsCoordinates, segmentCoordinates }) {
  let monitorMapData = monitorsCoordinates.map(mon => {
    return [mon.lat, mon.long, levelToIntensity(mon.faultLevel, mapOptions.maxIntensity)]
  });
  let segmentMapData = segmentCoordinates.map(seg => {
    return [seg.lat, seg.long, levelToIntensity(seg.faultLevel, mapOptions.maxIntensity)]
  });

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
        iconState: generateMapIcons(pmapData, this.state.simpleView),
      });

      if (this.state.iconState ) {
        this.state.contLoading = false;
      }

    }, 5000);
  }

  constructor(props) {
    super(props);
    this.state = {
      simpleView: true,
      zoom: mapOptions.defaultZoom,
      heatView: false,
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
      pmapDataError
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
      heatPoints = getHeatMapData(heatMapData);
    } else {
      return <Error404 />;
    }
    return (
      <div className="map-main-div">
        <div className="map-tile-div">
          <Map
            ref='map'
            center={mapOptions.centerPosition}
            maxBounds={[mapOptions.southWest, mapOptions.northEast]}
            zoom={this.state.zoom}
            zoomControl={false}
            maxZoom={18}
            attributionControl={false} >
            {(() => {
              if (this.state.simpleView)
                return (<div>
                  <TileLayer url="http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png" />
                  {(() => {
                    if (this.state.heatView) {
                      return (
                        <div>
                          <Rectangle bounds={mapOptions.rectangleBounds} color={'#beecff'} opacity={0.5} />
                          <HeatmapLayer
                            points={heatPoints}
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
            {this.state.iconState}
          </Map>
        </div>
        <div className="map-icon-button-div-layer2">
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
          <div className={`map-icon-div-layer2 ${this.state.simpleView ? "" : "invisible"}`}>
            <img
              className="icon-home"
              src={require("../images/heatmap_icon_blue.png")}
              alt="heat Toggle"
              onClick={() => { this.setState({ heatView: !this.state.heatView }) }} />
            <img
              className="icon-home"
              src={require("../images/recentre_icon_blue.png")}
              alt="re-center Map"
              onClick={() => {
                const map = this.refs.map.leafletElement;
                map.setView(mapOptions.centerPosition, mapOptions.defaultZoom)
              }} />
          </div>
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