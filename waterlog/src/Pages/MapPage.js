import React, { Component } from "react";
import MapComponent from "./../Components/Map";
class MapPage extends Component {
  render() {
    return (
      <div >
        <h1>Map</h1>
        <h2>with alerts</h2>
        <MapComponent height={500}/>
      </div>
    );
  }
}
export default MapPage;
