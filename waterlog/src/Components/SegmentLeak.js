import React, { Component } from 'react';
import WastageSummary from './WastageSummary';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAlerts } from '../actions/AlertsAction';
import Loader from './Loader';
import Error404 from './Error404';
import Map from './Map';

class SegmentLeak extends Component {
	constructor(props) {
		super(props);

		this.handleResolveClick = this.handleResolveClick.bind(this);
		this.state = {
			mapExpanded: false,
			leakResolved: false,
			error: null
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

	handleResolveClick(id) {
		var formData = new FormData();
		formData.append('id', id);

		fetch(`${process.env.REACT_APP_API_URL}/api/segmentleaks/resolveleaks`, {
			method: 'POST',
			body: formData
		})
			.then((res) => {
				if (res.ok) {
					this.setState({
						leakResolved: !this.state.leakResolved
					});
				}
			})
			.catch((err) => {
				this.setState({
					error: err
				});
				alert(String(err));
			});
	}

    getSeverityClass(severity){
			return severity.toLowerCase();
	}

	segmentMap = (
		<div className="segment-map">
			<Map height="300px" />
			<hr />
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

		const alert = alerts.filter((alert) => alert.entityId === parseInt(this.props.match.params.id) 
			&& alert.date == this.props.match.params.date )[0];
		
		const leakInfo = (
			<div>
				<div>
					<h2 className={this.getSeverityClass(alert.severity)}>{`${alert.entityName} ${alert.entityId} ${alert.entityType}`}</h2>
					<p className={this.getSeverityClass(alert.severity)}>({alert.severity})</p>
					<h1 className={this.getSeverityClass(alert.severity)}>R {alert.cost.toFixed(2)}</h1> 
					<p className={this.getSeverityClass(alert.severity)}>is being lost per hour!</p>
					<p className="static-grey">Loosing {alert.litresPerHour.toFixed(0)}&#x2113; per hour</p>
					<p className="static-grey"> no leak would be 0&#x2113; per hour</p>
				</div>
				<img
					id="map-toggle"
					src={this.state.mapExpanded === false ? 'images/map_expand.png' : 'images/map_close.png'}
					alt="segment-map"
					onClick={() => this.handleMapExpand()}
				/>
				<hr />
				{this.state.mapExpanded ? this.segmentMap : null}
				<p className="wastegeLabel">wastage</p>
				<WastageSummary
					severity={alert.severity}
					litres={alert.typeLitres.toFixed(0)}
					percent={(alert.typeLitres / alert.totalLitres * 100).toFixed(0)}
				/>
				{!this.state.leakResolved ? (
					<button
						onClick={() => this.handleResolveClick(alert.entityId)}
						disabled={this.state.leakResolved}
						className={`resolve-button ${!this.state.leakResolved ? 'unresolved-leak' : 'resolved-leak'}`}
					>
						{this.state.leakResolved ? (
							<img src="images/white_on_dark_loading.gif" alt="loading..." className="btn-loader" />
						) : (
							'LOG RESOLVED ISSUE'
						)}
					</button>
				) : (
					<p className="logged-issue-text">issue was logged</p>
				)}
				<small
					className={this.state.leakResolved === false ? 'default-status' : 'leak-unresolved-status'}
					id="resolved-status"
				>
					{this.state.leakResolved === false ? 'the problem is fixed, click here' : ''}
				</small>
			</div>
		);
		return <div>{leakInfo}</div>;
	}
}

SegmentLeak.propTypes = {
	fetchAlerts: PropTypes.func.isRequired,
	alerts: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
	alerts: state.alerts.items,
	loading: state.alerts.loading,
	error: state.alerts.error
});
export default connect(mapStateToProps, { fetchAlerts })(SegmentLeak);
