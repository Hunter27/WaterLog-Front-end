import React, { Component } from "react";
import { Map, TileLayer, Rectangle } from "react-leaflet";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchMapsData } from "./../actions/MapActions";
import { fetchHeatMapsData } from "./../actions/HeatMapActions";
import Loader from "./Loader";
import Error404 from "./Error404";
import HeatmapLayer from "react-leaflet-heatmap-layer";
import { generateMapIcons, levelToIntensity, mapOptions } from "./../utils";

function getHeatMapData({ monitorsCoordinates, segmentCoordinates }) {
  let monitorMapData = monitorsCoordinates.map(mon => [mon.lat, mon.long, levelToIntensity(mon.faultLevel, mapOptions.maxIntensity)]);
  let segmentMapData = segmentCoordinates.map(seg => [seg.lat, seg.long, levelToIntensity(seg.faultLevel, mapOptions.maxIntensity)]);

  let heatMapData = monitorMapData.concat(segmentMapData);
  return heatMapData;
}
class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      simpleView: false,
      zoom: mapOptions.defaultZoom,
      heatView: false
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
            minZoom={14}
            attributionControl={false}
            style={{ height: "250px" }} >
            {(() => {
              if (this.state.simpleView)
                return (<div>
                  <TileLayer url="http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png" />
                  {(() => {
                    if (this.state.heatView) {
                      return (
                      <div> 
                        <Rectangle bounds={mapOptions.rectangleBounds} color={'Navy'} opacity={1}/>
                        <HeatmapLayer
                        points={heatPoints}
                        longitudeExtractor={m => m[1]}
                        latitudeExtractor={m => m[0]}
                        intensityExtractor={m => parseFloat(m[2])}
                        gradient={{ 0.25: 'Blue', 0.5: 'Green', 0.75: 'Yellow', 1: 'Red'}}
                        radius={20}
                        blur={10}
                        max={mapOptions.maxIntensity} />
                      </div>);
                    }
                  })()}
                </div>
                );
            })()
            }
            {icons}
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
)(MapComponent);
