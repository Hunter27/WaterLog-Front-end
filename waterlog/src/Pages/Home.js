import React, { Component } from 'react';
// import { BrouserRouter as Router, Route, Link } from "react-router-dom";

import TankLevelsContainerComponent from './../Components/TankLevel';
import MiniMapComponent from './../Components/MiniMap';

//Contains all the components in the home page

class HomeComponent extends Component {
  render() {
    return (
      <div>
        <TankLevelsContainerComponent />
        <br />
        Usage what what ...
        <br />

        <MiniMapComponent />
      </div>
    );
  }
}

export default HomeComponent;