import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPollMapsData } from "./../actions/MapActions";
import { fetchHeatMapsData } from "./../actions/HeatMapActions";
import Loader from "./Loader";
import Error404 from "./Error404";
import MapUI from "./MapComponent";
import {
  generateMapIcons,
  getHeatMapData,
  generateMapTankIcons
} from "./../utils";
import heatMapIcon from "../images/heatmap_icon_blue.png";
import reCenterMapIcon from "../images/recentre_icon_blue.png";
import moreIcon from "../images/more_map_icon.png";

class MapComponent extends Component {
  async componentDidMount() {
    this.props.fetchHeatMapsData();
    this.props.fetchPollMapsData();

    setInterval(() => {
      this.props.fetchPollMapsData();
      const { pmapData } = this.props;
      let tankIcons = generateMapTankIcons(pmapData, this.state.simpleView);
      let mapIcons = generateMapIcons(pmapData, this.state.simpleView);

      this.setState({
        iconState: tankIcons.concat(mapIcons),
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
      heatView: false,
      iconState: null,
      contLoading: true,
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
    if ((heatLoading || this.state.contLoading) && this.props.pmapData < 1 && heatMapData < 1) {
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
            centerPosition={this.props.centerPosition}
            focus={{
              type: this.props.type ? this.props.type : 0,
              id: this.props.id ? this.props.id : 0
            }}
            mapsData={this.props.pmapData}
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
              className={`icon + ${this.state.moreOptions ? "" : "invisible"}`}
              src={heatMapIcon}
              alt="heat Toggle"
              onClick={() => { this.setState({ heatView: !this.state.heatView }) }} />
            <img
              className={`icon + ${this.state.moreOptions ? "" : "invisible"}`}
              src={reCenterMapIcon}
              alt="re-center Map"
              onClick={() => {
                this.refs.map.reCenter()
              }} />
            <img
              className="icon"
              src={moreIcon}
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
