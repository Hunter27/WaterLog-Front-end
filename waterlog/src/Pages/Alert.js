import React, { Component } from "react";
import AlertTable from "../Components/AlertTable";
import AlertsFilter from "../Components/AlertsFilter";

class AlertComponent extends Component {
  render() {
    return (
        <div >
          <AlertTable />
          <AlertsFilter />
        </div>
    );
  }
}
export default AlertComponent;
