import React, { Component } from 'react';
import AlertTable from '../Components/AlertTable';
import AlertsFilter from '../Components/AlertsFilter';

class AlertComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterOpen: false,
      dataFiltered: false
    };

    this.toggleFilter = this.toggleFilter.bind(this);
    this.wasFiltered = this.wasFiltered.bind(this);
  }

  toggleFilter = () => {
    this.setState({
      filterOpen: !this.state.filterOpen
    });
  };

  wasFiltered = (status) => {
    this.setState({
      dataFiltered: status
    });
  };
  render() {
    return (
      <div>
        <h1 className="usage-header">Filter Alerts</h1>
        {this.state.filterOpen ? (
          <AlertsFilter
            close={this.toggleFilter}
            hist={this.props.history}
            filtered={this.wasFiltered}
          />
        ) : (
            <AlertTable
              openFilter={this.toggleFilter}
              hist={this.props.history}
              dataFiltered={this.state.dataFiltered}
            />
          )}
      </div>
    );
  }
}
export default AlertComponent;
