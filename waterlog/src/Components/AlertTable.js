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
      ascending: false,
      page: 1,
      total: null,
      interval: null
    };
  }
  componentDidMount() {
    this.props.fetchAlerts(this.state.page, true);
    let _interval = setInterval(() => {
      if (!this.props.dataFiltered) {
        this.props.fetchAlerts(1);
      }
    }, 2000);

    this.setState({
      interval: _interval
    })
  }

  componentWillUnmount(){
    clearInterval(this.state.interval);
  }
  nextPage = async () => {
    this.setState({
      page: this.state.page + 1
    })
    await this.props.fetchAlerts(this.state.page + 1, true);
    if (this.props.total === 0) {
      this.setState({
        page: this.state.page - 1,
        total: this.props.total
      })
    }
  };

  render() {
    const { error, loading, alerts, hist, openFilter, f_alerts, f_loading, dataFiltered, filterError } = this.props;
    let data = alerts;
    if (dataFiltered) {
      data = f_alerts;
    }
    if (error || filterError) {
      return <Error404 />;
    }
    if ((loading || f_loading) && data.length < 1) {
      return <Loader />;
    }

    const sortAlerts = () => {
      this.state.ascending ? data.sort((a, b) => b.status - a.status) : data.sort((a, b) => a.status - b.status);
      this.setState({ ascending: !this.state.ascending });
    };

    const formattedTime = (Time, initialDate, status) => {
      const time = Time.split(':');
      if (parseInt(status) === 1) {
        const datetime = new Date(initialDate);
        datetime.setHours(datetime.getHours() + parseInt(time[0]));
        return 'resolved on ' + formatDate(datetime);
      }
      if (time.length !== 3) {
        return 'data not available';
      }
      if (time[0] === '00') {
        return 'unresolved for ' + time[1] + ' minutes';
      }
      return 'unresolved for ' + time[0] + ' hours';
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
          <img className="alert-img" src="images/filter_icon.png" alt="filter icon" onClick={openFilter} />
        </div>
        <table className="alerts-table">
          <tbody>
            {data.map((alert, index) => {
              if (!alert) {
                return null;
              }
              return (
                <tr
                  key={index}
                  className={`table-row ${parseInt(alert.status) === 2
                    ? 'table-row-unresolved'
                    : ''}`}
                  onClick={() => {
                    alert.entityName === 3
                      ? (window.location = `/alert/tank/${alert.entityId}`)
                      : hist.push(
                        `alert/${entityNameNumberToString(
                          alert.entityName
                        )}/${alert.entityId}/${alert.date}`
                      );
                  }}
                >
                  <td className="event-date">{formatDate(alert.date)}</td>

                  <td className={'alert-row-message'}>
                    {formattedTime(alert.duration, alert.date, alert.status)}
                  </td>

                  <td>{`${entityNameNumberToString(
                    alert.entityName
                  ).toUpperCase()} ${alert.entityId} ${alert.entityType.toUpperCase()}`}</td>
                  <td
                    className={
                      entityNameNumberToString(alert.entityName).toLowerCase() === 'segment' ? (
                        'alert-row-litres'
                      ) : (
                          'empty'
                        )
                    }
                  >
                    {entityNameNumberToString(alert.entityName).toLowerCase() === 'segment' ? (
                      `${parseFloat(alert.litresPerHour).toFixed(1)}` + ' l/Hr'
                    ) : null}
                  </td>
                  <td>
                    {entityNameNumberToString(alert.entityName).toLowerCase() === 'segment' ? (
                      `R${parseInt(alert.cost).toFixed(2)}/hr`
                    ) : null}
                  </td>
                  <td>
                    {entityNameNumberToString(alert.entityName).toLowerCase() === 'segment' ? (
                      <img
                        alt="severity indicator"
                        src={getStatusIcon(alert.severity)}
                        className="severity-indicator"
                      />
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {(this.state.total === 0 || dataFiltered)? ' ' :
          <button
            id="moreAlerts"
            className={loading ? "loading-button" : ''}
            onClick={this.nextPage}
          >
            Load More
        </button>}
        {
          alerts.length === 0 || (dataFiltered && f_alerts.length === 0)?'No Alerts': ''
        }
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
  error: state.alerts.error,
  total: state.alerts.total,
  changed: state.alerts.dataChange,
  filterError: state.filteredAlerts.error
});

export default connect(mapStateToProps, { fetchAlerts, fetchFilteredAlerts })(AlertTableComponent);
