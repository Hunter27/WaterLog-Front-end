import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchAlerts } from "../actions/AlertsAction";
import Loader from "./Loader";
import Error404 from "./Error404";
import { formatDate, getStatusIcon } from "./../utils";

class AlertTableComponent extends Component {
  componentDidMount() {
    this.props.fetchAlerts();
  }

  render() {
    const { error, loading, alerts } = this.props;

    if (error) {
      return <Error404 />;
    }
    if (loading) {
      return <Loader />;
    }
    return (
      <table>
        <tbody>
          {alerts.map((alert, index) => (
            <tr
              key={index}
              className="table-row table-row-unseen"
              onClick={() =>
                (window.location.href = `alert/${alert.entityName}/${
                  alert.entityId
                }`)
              }
            >
              <td className="leak-date">{formatDate(alert.date)}</td>
              <td>{`${alert.entityName.toUpperCase()} ${
                alert.entityId
              } ${alert.entityType.toUpperCase()}`}</td>
              <td>
                {alert.entityName === "Segment" ? `R${alert.cost}/hr` : ""}
              </td>
              <td>
                {alert.entityName === "Segment"
                  ? getStatusIcon(alert.severity)
                  : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

AlertTableComponent.propTypes = {
  fetchAlerts: PropTypes.func.isRequired,
  alerts: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alerts.items,
  loading: state.alerts.loading,
  error: state.alerts.error
});

export default connect(
  mapStateToProps,
  { fetchAlerts }
)(AlertTableComponent);
