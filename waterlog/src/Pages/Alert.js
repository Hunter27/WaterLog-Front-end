import React, { Component } from "react";
import AlertTable from "../Components/AlertTable";
import { Provider } from "react-redux";
import store from "../Store";

class AlertComponent extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AlertTable />
        </div>
      </Provider>
    );
  }
}
export default AlertComponent;
