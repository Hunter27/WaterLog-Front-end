import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchFilteredAlerts } from "./../actions/AlertsAction";

class TryCedric extends Component {
  componentWillMount() {
    this.props.fetchFilteredAlerts(this.props.segment,this.props.sensorId,this.props.sensortype,this.props.severity);
	}
  render() {
    const postItems = this.props.alerts.map(alert => (
      <div key={alert.sensorId}>
        <h3>{alert.sensortype}</h3>
        <p>{alert.severity}</p>
        <p>{alert.segment}</p>
      </div>
    ));
    
    console.log("My Fetched alerts:",this.props );
    return (

      <div>
        {postItems}
      </div>
    )
  }
}
TryCedric.propTypes = {
  fetchFilteredAlerts: PropTypes.func.isRequired,
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alerts.items,
  loading: state.alerts.loading,
  error: state.alerts.error
});

export default  connect(
  mapStateToProps,
  { fetchFilteredAlerts }
)(TryCedric);
