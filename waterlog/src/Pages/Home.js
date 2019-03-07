import React, { Component } from "react";
import Wastage from "./../Components/Wastage";
import MapComponent from "./../Components/Map";
import TankLevels from "./../Components/TankLevels";

class HomeComponent extends Component {
  render() {
    return (
      <div className="home">
        <MapComponent />
        <div className="wastage-tank-wrapper">
          <Wastage />
          <TankLevels/>
        </div>
      </div>
    );
  }
}
export default HomeComponent;
