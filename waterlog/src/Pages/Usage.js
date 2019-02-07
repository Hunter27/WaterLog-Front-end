import React, { Component } from 'react'; 
import Sensors from './../Components/Sensors';
import Segments from './../Components/Segments';
import SegmentsEventsList from './../Components/SegmentEventsList';
import SegmentLeaks from './../Components/segmentleaks';
import {Provider} from 'react-redux';
import store from '../store';

class UsageComponent extends Component {
  render() {
    return ( 
     
        <Provider store={store}>
            <div className="App">
            <h1>List of Components</h1>
            <Sensors/> 
            <hr/>
            <h1>Segments</h1> 
            <Segments/>
            <hr/>
            <h1>Segments Events</h1> 
            </div>
            <SegmentsEventsList/>
            <hr/>
            <Segmentleaks/>
      </Provider> 
    );
  }
}

export default UsageComponent;