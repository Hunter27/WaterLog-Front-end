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
} from "../actions/MapActions";
import { fetchHeatMapsData } from "../actions/HeatMapActions";
import Loader from "./Loader";
import Error404 from "./Error404";
import HeatmapLayer from "react-leaflet-heatmap-layer";
import {
  generateMapIcons,
  getHeatMapData,
  mapOptions
} from "../utils";
import MapUI from "./MapComponent";


class MapFullScreenComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      simpleView: true,
      heatView: false,
      zoom: mapOptions.defaultZoom,
      moreOptions: false
    };
  }

  async componentDidMount() {
    this.props.fetchMapsData();
    this.props.fetchHeatMapsData();
    this.timer = setInterval(() => {
      this.props.fetchPollMapsData()
      const { pmapData } = this.props;
      this.setState({
        iconState: generateMapIcons(pmapData, this.state.simpleView),
      });

      if (this.state.iconState) {
        this.state.contLoading = false;
      }

    }, 5000);
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
    if (heatMapData) {
      heatPoints = getHeatMapData(heatMapData);
    } else {
      return <Error404 />;
    }
    return (
      <div className="map_main-div-fullscreen">
        <div className="map-icon-button-div-layer2-fullscreen">
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
          </div>
          <div className={`map-icon-div-layer2-fullscreen map-button-tab ${this.state.simpleView ? "" : "invisible"}`}>

            <img
              className="icon-home"
              src={require("../images/more_map_icon.png")}
              alt="more options"
              onClick={() => {
                this.setState({ moreOptions: !this.state.moreOptions });
              }} />
            <img
              className={`icon + ${this.state.moreOptions ? "" : "invisible"}`}
              src={require("../images/heatmap_icon_blue.png")}
              alt="heat Toggle"
              onClick={() => { this.setState({ heatView: !this.state.heatView }) }} />
            <img
              className={`icon + ${this.state.moreOptions ? "" : "invisible"}`}
              src={require("../images/recentre_icon_blue.png")}
              alt="re-center Map"
              onClick={() => {
                this.refs.map.reCenter();
              }} />
          </div>
        </div>
        <div className="map-tile-div-fullscreen">
          {(() => console.log("icon", this.state.iconState))()}
          <MapUI
            setView={this.state.simpleView}
            heatView={this.state.heatView}
            heatIcons={heatPoints}
            icons={this.state.iconState}
            height={'100vh'}
            ref='map'
          />
        </div>
      </div>
    );
  }
}

MapFullScreenComponent.propTypes = {
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
)(MapFullScreenComponent);
