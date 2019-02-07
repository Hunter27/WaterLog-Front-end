import React, { Component } from 'react';

import ComponentLeakage from './ComponentLeakage';

class MapComponent extends Component {

  render() {
    return ( 
        <div className="App">
            <ComponentLeakage />
        </div>
    );
  }
}

export default MapComponent;