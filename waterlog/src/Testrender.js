import React, { Component } from 'react';
import InformationComponent from './Components/Information';

class Test extends Component {
  render() {
    return (
      <InformationComponent percentage={10} moneyLost= {20} waterLost={0}/>
    );
  }
}

export default Test;
