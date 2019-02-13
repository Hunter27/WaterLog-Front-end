import React, {Component} from 'react';
import HistoryComponent from './History'

class MapComponent extends Component {
  render() {
    return ( 
    <div className = "App" >
      <div> <HistoryComponent/> </div> 
    </div>
    );
  }
}
export default MapComponent;
