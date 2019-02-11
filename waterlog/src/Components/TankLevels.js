import React, { Component } from 'react';
import Tank from './Tank'

class TankLevels extends Component {
  constructor(){
    super();
    this.state = {
      tanks: [{
          name: "Tank 1",
          waterLevel: 100,
          status: "sufficient level",
          pumpOn: true
        },{
          name: "Tank 2",
          waterLevel: 0,
          status: "insufficient level",
          pumpOn: false
        },{
          name: "Tank 3",
          waterLevel: 50,
          status: "acceptable level",
          pumpOn: true
        }
      ]
    }
  }
  render(){
    return (
      <div className="tank-container">
        {this.state.tanks.map((tank,index) => 
          <Tank key={index} tank={tank} />
        )}
      </div>
    )
  }
}
export default TankLevels;