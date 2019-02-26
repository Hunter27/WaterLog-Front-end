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

	segmentMap = <div className="segment-map"><Map height="400px"/><hr /></div>;

	resolvedDate = <div><h3>(fixed on {formatDate(Date.now())})</h3><p></p></div>

	render() {
		const { error, loading, alerts } = this.props;
		if ((!alerts || alerts.length === 0) && loading) {
			return <Loader />;
		}
		if (error) {
			return <Error404/>;
		}

		const sensorInfo = alerts.map((alert, index) => {
			if (alert.entityId === parseInt(this.props.match.params.id)) {
				return (
					<div key={index}>
						<div>
							<h2>{`${alert.entityName} ${alert.entityId} ${alert.entityType}`}</h2>
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
						{alert.status == 1 ? this.resolvedDate : null}
						<SensorDiagram sensorId={alert.entityId} />
						{ alert.status == 1 ?
						<div className="resolve">
							<button
								onClick={() => this.handleResolveClick(alert.entityId)}
								disabled={this.state.leakResolved}
								className={`resolve-button ${!this.state.leakResolved
									? 'unresolved-leak'
									: 'resolved-leak'}`}
							>
								{this.state.leakResolved ? 'RESOLVED' : 'LOG RESOLVED ISSUE'}
							</button>
							<small
								className={
									this.state.leakResolved === false ? 'default-status' : 'leak-unresolved-status'
								}
								id="resolved-status"
							>
								{this.state.leakResolved === false ? 'the problem is fixed, click here' : ''}
							</small>
						</div> : null }
					</div>
				);
			}
		});

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
