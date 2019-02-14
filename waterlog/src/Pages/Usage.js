import React, { Component } from "react";
import UsageCostComponent from './../Components/Usage-cost';

class UsageComponent extends Component {
  render() {
    return <div>
      Usage page
      <UsageCostComponent />
      </div>;
  }
}
export default UsageComponent;
