
import React, { Component } from 'react';
import TankComponent from '../Components/TankComponent';
import Wastage from './../Components/Wastage';
import AlertsMap from './../Components/AlertsMap';
import TankLevels from './../Components/TankLevels';


class HomeComponent extends Component {
  render() {
    return (
      <div>
        <p className="home-text">Alerts Map</p>
        <AlertsMap />
        <Wastage />
        <p className="home-text">Tank Levels</p>
        <TankLevels />
        <TankComponent />
      </div>
    );
  }
}
export default HomeComponent;
