import React, { Component } from "react";
import {
  Map,
  TileLayer,
  Rectangle
} from "react-leaflet";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPollMapsData } from "./../actions/MapActions";
import { fetchHeatMapsData } from "./../actions/HeatMapActions";
import Loader from "./Loader";
import Error404 from "./Error404";
import HeatmapLayer from "react-leaflet-heatmap-layer";
import MapUI from "./MapComponent";
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
    this.props.fetchHeatMapsData();
    this.props.fetchPollMapsData();
    setTimeout(() => {
      this.props.fetchPollMapsData();
      const { pmapData } = this.props;
      this.setState({
        iconState: generateMapIcons(pmapData, this.state.simpleView),
      });

      if (this.state.iconState) {
        this.state.contLoading = false;
      }

    }, 2000);
  }

  constructor(props) {
    super(props);
    this.state = {
      simpleView: true,
      zoom: mapOptions.defaultZoom,
      heatView: false,
      iconState: null,
      contLoading: true,
      reCenter: false,
      moreOptions: false
    };
  }

  render() {
    const {
      heatError,
      heatLoading,
      heatMapData,
      pmapDataError
    } = this.props;
    if (heatError || pmapDataError) {
      return <Error404 />;
    }
    if (heatLoading || this.state.contLoading) {
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
      <div className="map-main-div">
        <div className="map-tile-div">
          <MapUI
            setView={this.state.simpleView}
            heatView={this.state.heatView}
            heatIcons={heatPoints}
            icons={this.state.iconState}
            reCenter={this.state.reCenter}
            focus={[-25.783155, 28.336761]}
            ref='map'
          />
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
              className={`icon-home + ${this.state.moreOptions ? "" : "invisible"}`}
              src={require("../images/heatmap_icon_blue.png")}
              alt="heat Toggle"
              onClick={() => { this.setState({ heatView: !this.state.heatView }) }} />
            <img
              className={`icon-home + ${this.state.moreOptions ? "" : "invisible"}`}
              src={require("../images/recentre_icon_blue.png")}
              alt="re-center Map"
              onClick={() => {
                this.refs.map.reCenter()
              }} />
            <img
              className="icon-home"
              src={require("../images/more_map_icon.png")}
              alt="more options"
              onClick={() => {
                this.setState({ moreOptions: !this.state.moreOptions });
              }} />
          </div>
        </div>
      </div>
    );
  }
}

MapComponent.propTypes = {
  fetchPollMapsData: PropTypes.func,
  pmapData: PropTypes.array
};

const mapStateToProps = state => ({
  pmapData: state.pmaps.items,
  heatMapData: state.heatMap.items,
  heatLoading: state.heatMap.loading,
  heatError: state.heatMap.error,
  pmapDataLoading: state.pmaps.loading,
  pmapDataError: state.pmaps.error
});

export default connect(
  mapStateToProps,
  {
    fetchPollMapsData,
    fetchHeatMapsData
  }
)(MapComponent);
