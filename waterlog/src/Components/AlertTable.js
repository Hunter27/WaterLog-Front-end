import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAlerts } from '../actions/AlertsAction';
import { fetchFilteredAlerts } from '../actions/FilterAction';
import Loader from './Loader';
import Error404 from './Error404';
import { 
  formatDate, 
  getStatusIcon, 
  entityNameNumberToString
 } from './../utils';

class AlertTableComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ascending: false
    };
  }
  componentDidMount() {
    if (this.props.alerts.length === 0) {
      this.props.fetchAlerts(this.props.page);
    }
  }
  nextPage = () => {
    this.props.fetchAlerts(this.props.page);
  };

  render() {
    const { error, loading, alerts, hist, openFilter, f_alerts, f_loading, dataFiltered } = this.props;
    let data = alerts;
    if (dataFiltered) {
      data = f_alerts
    }
    if (error) {
      return <Error404 />;
    }
    if ((loading || f_loading) && data.length < 1) {
      return <Loader />;
    }

    const sortAlerts = () => {
      this.state.ascending ? data.sort((a, b) => b.status - a.status) : data.sort((a, b) => a.status - b.status);
      this.setState({ ascending: !this.state.ascending });
    };

    return (
      <div>
        <h1 className="alerts-header">Alerts</h1>
        <div className="img-container">
          <img
            className="alert-img"
            src="images/ascending_descending.png"
            alt="ascending_descending icon"
            onClick={() => sortAlerts()}
          />
          <img className="alert-img"
            src="images/filter_icon.png"
            alt="filter icon"
            onClick={openFilter}
          />
        </div>
        <table className="alerts-table">
          <tbody>
            {data.map((alert, index) => {
              if (!alert) {
                return null;
              }
              return <tr
                key={index}
                className={`table-row ${parseInt(alert.status) === 2 ? 'table-row-unresolved' : ''}`}
                onClick={() => (hist.push(`alert/${entityNameNumberToString(alert.entityName)}/${alert.entityId}/${alert.date}`))}
              >
                <td className="event-date">{formatDate(alert.date)}</td>
                <td>{`${entityNameNumberToString(alert.entityName).toUpperCase()} ${alert.entityId} ${alert.entityType.toUpperCase()}`}</td>
                <td>
                  {entityNameNumberToString(alert.entityName).toLowerCase() === 'segment'
                    ? `R${parseInt(alert.cost).toFixed(2)}/hr`
                    : null}
                </td>
                <td>
                  {entityNameNumberToString(alert.entityName).toLowerCase() === 'segment' ? (
                    <img alt="severity indicator" src={getStatusIcon(alert.severity)} className="severity-indicator" />
                  ) : (
                      null
                    )}
                </td>
              </tr>
            })}
          </tbody>
        </table>
        <button id="moreAlerts" onClick={this.nextPage}>
          Load More
				</button>
      </div>
    );
  }
}

AlertTableComponent.propTypes = {
  fetchAlerts: PropTypes.func.isRequired,
  alerts: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  f_alerts: PropTypes.array
};

const mapStateToProps = (state) => ({
  alerts: state.alerts.items,
  f_alerts: state.filteredAlerts.items,
  f_loading: state.filteredAlerts.loading,
  loading: state.alerts.loading,
  page: state.alerts.page,
  error: state.alerts.error
});

export default connect(mapStateToProps, { fetchAlerts, fetchFilteredAlerts })(AlertTableComponent);
