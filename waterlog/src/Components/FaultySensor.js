import React, { Component } from 'react';
import SensorDiagram from './SensorDiagram';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAlerts } from '../actions/AlertsAction';
import Loader from './Loader';
import Error404 from './Error404';
import Map from './Map';
import { formatDate } from './../utils';

class FaultySensor extends Component {
	constructor() {
		super();
		this.handleResolveClick = this.handleResolveClick.bind(this);
		this.state = {
			mapExpanded: false,
			leakResolved: false
		};
	}

	componentDidMount() {
		this.props.fetchAlerts();
	}

	handleMapExpand() {
		this.setState({
			mapExpanded: !this.state.mapExpanded
		});
	}

	handleResolveClick(data) {
		fetch(`${process.env.REACT_APP_API_URL}/api/segmentleaks/${this.props.match.params.id}`, {
			method: 'PUT',
			mode: 'cors',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((res) => {
			res.json();
			this.setState({
				leakResolved: !this.state.leakResolved
			});
		});
	}

	segmentMap = (
		<div className="segment-map">
			<Map height="400px" />
			<hr />
		</div>
	);

	dateResolved =(date) => (
		<div className="date-resolved">
			<h4>(fixed on {formatDate(Date.now())})</h4>
			<small>took {date - Date.now()} days</small>
		</div>
	);

	render() {
		const { error, loading, alerts } = this.props;
		if ((!alerts || alerts.length === 0) && loading) {
			return <Loader />;
		}
		if (error) {
			return <Error404 />;
		}

		const alert = alerts.filter(
			(alert) =>
				alert.entityId === parseInt(this.props.match.params.id) && alert.date == this.props.match.params.date
		)[0];

		const sensorInfo = (
			<div>
				<div>
					<h2 className={alert.status == 2 ? alert.severity.toLowerCase() : 'leak-resolved'}>{`${alert.entityName} ${alert.entityId} ${alert.entityType}`}</h2>
					<p id="water-flow">
						{0}% /{alert.typeLitres.toFixed(1)}/hr water flow
					</p>
					<small>(surrounding sensors have 100% waterflow)</small>
				</div>
				<img
					id="map-toggle"
					src={this.state.mapExpanded === false ? 'images/map_expand.png' : 'images/map_close.png'}
					alt="segment-map"
					onClick={() => this.handleMapExpand()}
				/>
				<hr />
				{this.state.mapExpanded ? this.segmentMap : null}
				{alert.status == 1 ? this.dateResolved(alert.date) : null}
				<SensorDiagram sensorId={alert.entityId} status={alert.status} />
				{alert.status == 2 ? (
					<div className="resolve">
						<button
							onClick={() => this.handleResolveClick(alert.entityId)}
							disabled={this.state.leakResolved}
							className={`resolve-button ${!this.state.leakResolved
								? 'unresolved-leak'
								: 'resolved-leak'}`}
						>
							LOG RESOLVED ISSUE
						</button>
						<small
							className='default-status'
							id="resolved-status"
						>
							the problem is fixed, click here
						</small>
					</div>
				) : null}
			</div>
		);

		return <div>{sensorInfo}</div>;
	}
}
FaultySensor.propTypes = {
	fetchAlerts: PropTypes.func.isRequired,
	alerts: PropTypes.array.isRequired,
	loading: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
	alerts: state.alerts.items,
	loading: state.alerts.loading,
	error: state.alerts.error
});

export default connect(mapStateToProps, { fetchAlerts })(FaultySensor);
