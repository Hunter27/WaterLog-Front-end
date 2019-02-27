import React, { Component } from "react";
import Usage from "./../Components/Usage";
import TryNumberNotifs from "./../Components/TryNumberNotifs";
class UsageComponent extends Component {
  render() {
    return (
      <div>
        <Usage />
        <TryNumberNotifs/>
      </div>
    );
  }
}
export default UsageComponent;
