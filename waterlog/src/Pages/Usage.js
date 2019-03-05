import React, { Component } from "react";
import Usage from "./../Components/Usage";
import TryCedric from "./../Components/TryCedric";
class UsageComponent extends Component {
  render() {
    return (
      <div> 
        <TryCedric segment={5} sensorId={1} sensortype={2} severity={3}/>
        <Usage/>
      </div>
    );
  }
}
export default UsageComponent;
