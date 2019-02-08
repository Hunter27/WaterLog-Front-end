import React, { Component } from 'react';
import TankComponent from './Tank'
import './../../node_modules/bootstrap/dist/css/bootstrap.min.css';

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
  
  render() {
    return (
      <div className="jumbotron container p-4"
      style={{borderRadius: 0, textAlign: 'center', border: '1px dashed grey',minHeight:'400px',  width: '100%'}}>
        <h3>TANK LEVELS</h3>
        <div className="row">
          { this.tankInfo.map(
            tank => <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-12">
                      <TankComponent
                      key={tank.id} 
                      name={tank.name} 
                      percentage={tank.percentage } />
                    </div>  
          )}
        </div>
      </div>
    );
  }
}





