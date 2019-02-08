import React, { Component } from 'react';
import './../../node_modules/bootstrap/dist/css/bootstrap.min.css';
export default class TankComponent extends Component {
  
  tankName = this.props.name;
  percentage = this.props.percentage;

  render() {
    return (
      <div className="tank">
        <p>{this.tankName}</p>
        <div className="div">
          { this.percentage} % 
        </div>
      </div>
    );
  }
}
