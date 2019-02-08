import React, { Component } from 'react';
import './../../node_modules/bootstrap/dist/css/bootstrap.min.css';
export default class TankComponent extends Component {
  
  tankName = this.props.name;
  percentage = this.props.percentage;

  render() {
    return (
      <div style={{width: '150px', border: '1px solid black', textAlign:'center', float: 'left', margin: '2px'}}>
        <p>{this.tankName}</p>
        <div 
          style={{ border: '2px solid black', backgroundColor: 'red', width: '150px', height: '200px'}} 
        >
          { this.percentage} % 
        </div>
      </div>
    );
  }
}
