import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  fetchPollMapsData
} from "../actions/MapActions";
import { fetchHeatMapsData } from "../actions/HeatMapActions";
import Loader from "./Loader";
import Error404 from "./Error404";
import {
  generateMapIcons,
  getHeatMapData
} from "../utils";
import MapUI from "./MapComponent";


class MapFullScreenComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      simpleView: true,
      heatView: false,
      iconState: null,
      contLoading: true,
      moreOptions: false
    };
  }

  async componentDidMount() {
    this.props.fetchHeatMapsData();
    this.props.fetchPollMapsData();
    setTimeout(() => {
      this.props.fetchPollMapsData()
      const { pmapData } = this.props;
      this.setState({
        iconState: generateMapIcons(pmapData, this.state.simpleView),
      });

      if (this.state.iconState) {
        this.state.contLoading = false;
      }

    }, 2000);
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
)(MapFullScreenComponent);
