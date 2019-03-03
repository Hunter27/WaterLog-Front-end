import React, { Component } from "react";
import TankComponent from "../Components/TankComponent";
import PumpButton from "./../Components/PumpButton";
import GraphLine from "../Components/DailyTankGraph";

class TankInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id
    };
  }
  handleMapExpand() {
    this.setState({
      mapExpanded: !this.state.mapExpanded
    });
  }

  render() {
    return (
      <div>
        <TankComponent id={this.state.id} />
        <PumpButton id={this.state.id} />
        <img
          id="map-toggle"
          src={
            this.state.mapExpanded === false
              ? "images/map_expand.png"
              : "images/map_close.png"
          }
          alt="segment-map"
          onClick={() => this.handleMapExpand()}
        />
        <GraphLine className="UsageTnk" id={this.state.id} />
      </div>
    );
  }
}
export default TankInformation;
