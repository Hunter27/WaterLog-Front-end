//icon
import React, { Component } from 'react';

export default class TankComponent extends Component {
    

  render() {
      
    return (
       

      <div className={"tankComponent"}>
           <h3>{this.props.tankName}</h3>

          <img src="/images/ICONS/100_tank.png" 
            width="150" 
            height="150"
            alt ="50% tank"/>
             
          <h6>{this.props.levelDescription}</h6>

          <h5>{this.props.pumpStatus}</h5>

        </div>
      
    );
  }
}
