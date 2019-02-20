import React, { Component } from "react";  
import Usage from './../Components/Usage';
class UsageComponent extends Component {
  render() {
    return( <div>
        <p className="home-text">WATER USAGE & COST</p>
        <Usage/>
      </div>
    )
  }
}
export default UsageComponent;
