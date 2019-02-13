import React from 'react';
import TankLevelsContainerComponent from './../Components/TankLevel';
import InformationComponent from '../Components/Information';
import TankComponent from '../Components/TankComponent';

class HomeComponent extends React.Component {
  render() {
    return (
      <div>
        <TankLevelsContainerComponent />
        <InformationComponent />
        <TankComponent />

      </div>
    );
  }
}

export default HomeComponent;
