import React from 'react';
import TankLevelsContainerComponent from './../Components/TankLevel';
import MiniMapComponent from './../Components/MiniMap';
import InformationComponent from '../Components/Information'

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