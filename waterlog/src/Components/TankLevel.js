import React, { Component } from 'react';
import TankComponent from './Tank'


// Contains the tank levels that are displayed on the home page
export default class TankLevelsContainerComponent extends Component {
  
  tankInfo = [
    {
      id : 1,
      name : 'Tank 1',
      percentage: 100
    }, 
    {
      id : 2,
      name : 'Tank 2',
      percentage: 68
    },
    {
      id : 3,
      name : 'Tank 3',
      percentage: 30
    }
  ];
  

  //  <TankComponent name="tank 1" percentage="100" />
  
  render() {
    return (
      <div style={{textAlign: 'center', border: '1px dashed grey', height: '400px', width: '100%'}}>
        <h1>TANK LEVELS</h1>
        { this.tankInfo.map(
          tank => <TankComponent
                    key={tank.id} 
                    name={tank.name} 
                    percentage={tank.percentage } />
        )}
       
      </div>
    );
  }
}




