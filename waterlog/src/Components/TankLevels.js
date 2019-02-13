import React, { Component } from 'react';
import Tank from './Tank'

class TankLevels extends Component {
  constructor(props){
    super(props);
    this.state = {
      tanks: [{
          name: "Tank 1",
          waterLevel: 0,
          status: "sufficient level",
          pumpOn: true
        },{
          name: "Tank 2",
          waterLevel: 75,
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