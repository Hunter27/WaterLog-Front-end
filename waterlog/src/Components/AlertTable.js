import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchAlerts } from "../actions/AlertsAction";
import Loader from "./Loader";
import Error404 from "./Error404";
import { formatDate, getStatusIcon } from "./../utils";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
require('../Stylesheets/_alerts.scss');

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
      <div>
        <h1 className="alertsH1">Alerts</h1>
        <table>
          <tbody>
            {alerts.map((alert, index) => (
              <Card className="card-alert">
              <CardContent>
              <tr
                key={index}
                className={alert.status === 1 ? "entity-disabled table-row" : "table-row table-row-unseen"}
                onClick={alert.status === 2 ? () =>
                (window.location.href = `alert/${alert.entityName}/${
                    alert.entityId
                  }`)
                : () => {}
                }
              >
                <td className="leak-date">{formatDate(alert.date)}</td>
                <td className="leak-name">{`${alert.entityName.toUpperCase()} ${
                  alert.entityId
                } ${alert.entityType.toUpperCase()}`}</td>
                <td className="leak-cost">
                  {alert.entityName === "Segment" ? `R${(alert.cost).toFixed(2)}/hr` : ""}
                </td>
                <td className="leak-severity">
                  {alert.entityName === "Segment"
                    ? getStatusIcon(alert.severity)
                    : ""}
                </td>
              </tr>
              </CardContent>
            </Card>
            ))}
            </tbody>
          </table>
      </div>
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
