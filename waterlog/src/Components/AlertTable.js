import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAlerts } from '../actions/AlertsAction';
import Loader from './Loader';
import Error404 from './Error404';
import { formatDate, getStatusIcon } from './../utils';

class AlertTableComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			ascending: false
		};
	}
	componentDidMount() {
		document.addEventListener('scroll', this.trackScrolling);
		if (this.props.alerts.length == 0) this.props.fetchAlerts(this.props.page);
	}
	nextPage = () => {
		this.props.fetchAlerts(this.props.page);
	};

	render() {
		const { error, loading, alerts } = this.props;

		if (error) {
			return <Error404 />;
		}
		if (loading && alerts.length < 1) {
			return <Loader />;
		}

		const sortAlerts = () => {
			this.state.ascending ? alerts.sort((a, b) => b.status - a.status) : alerts.sort((a, b) => a.status - b.status);
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
					<img className="alert-img"  src="images/filter_icon.png" alt="filter icon"/>
				</div>
				<table className="alerts-table">
					<tbody>
						{alerts.map((alert, index) => (
							<tr
								key={index}
								className={`table-row ${parseInt(alert.status) == 2 ? 'table-row-unresolved' : ''}`}
								onClick={() => (window.location.href = `alert/${alert.entityName}/${alert.entityId}/${alert.date}`)}
							>
								<td className="event-date">{formatDate(alert.date)}</td>
								<td>{`${alert.entityName.toUpperCase()} ${alert.entityId} ${alert.entityType.toUpperCase()}`}</td>
								<td>{alert.entityName === 'Segment' ? `R${parseInt(alert.cost).toFixed(2)}/hr` : ''}</td>
								<td>
									{alert.entityName === 'Segment' ? (
										<img alt="severity indicator" src={getStatusIcon(alert.severity)} className="severity-indicator" />
									) : (
										''
									)}
								</td>
							</tr>
						))}
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
	loading: state.alerts.loading,
	page: state.alerts.page,
	error: state.alerts.error
});

export default connect(mapStateToProps, { fetchAlerts })(AlertTableComponent);
