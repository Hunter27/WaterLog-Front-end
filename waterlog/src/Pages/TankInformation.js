import React, { Component } from 'react';
import TankComponent from '../Components/TankComponent';
import PumpButton from './../Components/PumpButton'


class TankInformation extends Component {
  constructor(props){
    super(props);
    this.state={
      id:this.props.match.params.id
    }
  }
  render() {
    return (
      <div>
        <TankComponent  id={this.state.id} />
        <PumpButton id={this.state.id} />
      </div>
    );
  }
}
export default TankInformation;
