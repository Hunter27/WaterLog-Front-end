import React, { Component } from 'react';
import SensorDiagram from './SensorDiagram';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchSensor } from '../actions/SensorAction';
import Loader from './Loader';
import Error404 from './Error404';
import Map from './Map';
import { formatDate } from './../utils';
import { Globals } from './../Globals';
import back_button from "./../images/back_button.png"
import map_expand from './../images/map_expand.png'
import map_close from './../images/map_close.png'

class FaultySensor extends Component {
	constructor() {
		super();
		this.handleResolveClick = this.handleResolveClick.bind(this);
		this.state = {
			mapExpanded: false,
			faultResolved: false
		};
	}

	componentDidMount() {
		this.props.fetchSensor(this.props.match.params.id, this.props.match.params.date);
	}

	handleMapExpand() {
		this.setState({
			mapExpanded: !this.state.mapExpanded
		});
	}

	handleResolveClick(data) {
		fetch(`${process.env.REACT_APP_API_URL}/api/SensorMonitor/resolveSensor/${this.props.match.params.id}`, {
			method: 'PUT',
			mode: 'cors',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((res) => {
			res.json();
			this.setState({
				faultResolved: true
			});
			this.props.history.go(0);
		});
	}

	segmentMap = (id) => (
		<div className="segment-map">
			<Map type={Globals.COMPONENT_TYPES.SENSOR} id={id} />
		</div>
	);

	dateResolved = (date) => (
		<div className="date-resolved">
			<h4>(fixed on {formatDate(Date.now())})</h4>
			<small>took {date - Date.now()} days</small>
		</div>
	);

	render() {
		const { error, loading, sensor } = this.props;

		if (loading) {
			return <Loader />;
		}
		if (error) {
			return <Error404 />;
		}
		if (!loading && sensor.length < 1) {
			return <Error404 />;
		}

		const selectedSensor = sensor[0];
		const { status, entityId, date, typeLitres } = selectedSensor;

		const resolved = parseInt(status) === 1 ? true : false;
		const sensorInfo = (
			<div>
				<img
					className="back-icon"
					src={back_button}
					alt="backButton"
					onClick={() => this.props.history.push('/alert')}
				/>
				<div>
					<h2 className={!resolved ? 'sensor-unresolved' : 'sensor-resolved'}>
						{resolved ? `Sensor ${entityId} was Faulty` : `Sensor ${entityId} is Faulty`}
					</h2>
					<p id="water-flow">
						{0}% /{typeLitres.toFixed(1)}/hr water flow
					</p>
					<small>(surrounding sensors have 100% waterflow)</small>
				</div>
				<img
				 id="map-toggle"
				 src={this.state.mapExpanded === false ?
					 map_expand :
					 map_close}
				 alt="segment-map"
				 onClick={() => this.handleMapExpand()}
				/>
				<hr />
				{this.state.mapExpanded ? this.segmentMap(entityId) : null}
				{resolved ? this.dateResolved(date) : null}
				<SensorDiagram sensorId={entityId} status={resolved} />
				{!resolved ? (
					<div className="resolve">
						<button
							onClick={() => this.handleResolveClick(entityId)}
							disabled={this.state.faultResolved}
							className={`resolve-button ${!this.state.faultResolved
								? 'unresolved-leak'
								: 'resolved-leak'}`}
						>
							LOG RESOLVED ISSUE
						</button>
						<small className="default-status" id="resolved-status">
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
	fetchSensor: PropTypes.func.isRequired,
	sensor: PropTypes.array.isRequired,
	loading: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
	sensor: state.sensor.item,
	loading: state.sensor.loading,
	error: state.sensor.error
});

export default connect(mapStateToProps, { fetchSensor })(FaultySensor);
