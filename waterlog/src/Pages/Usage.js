import React, { Component } from "react";
import Usage from "./../Components/Usage"; 
class UsageComponent extends Component {
  render() {
    return (
      <div>
        <h1 className = "usage-header">Water Usage & Cost</h1>
        <Usage />
      </div>
    );
  }
}
export default UsageComponent;
