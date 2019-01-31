import React, {Component} from 'react';
// import { BrouserRouter as Router, Route, Link } from "react-router-dom";

import TankLevelsContainerComponent from './../Components/TankLevel';
import MiniMapComponent from './../Components/MiniMap';
import InformationComponent from '../Components/Information'

//Contains all the components in the home page

class HomeComponent extends React.Component {
  render() {
    return (
      <div>
        <TankLevelsContainerComponent />
       <InformationComponent />
        <MiniMapComponent />
      </div>
    );
  }
}

export default HomeComponent;