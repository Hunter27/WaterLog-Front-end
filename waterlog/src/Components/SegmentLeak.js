import React, { Component } from 'react';
import WastageSummary from './WastageSummary';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchSegment } from '../actions/SegmentAction';
import Loader from './Loader';
import Error404 from './Error404';
import Map from './Map';
import { Globals } from '../Globals';
import back_button from "./../images/back_button.png"
import map_expand from './../images/map_expand.png'
import map_close from './../images/map_close.png'

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
		this.props.fetchSegment(this.props.match.params.id, this.props.match.params.date);
	}

	handleMapExpand() {
		this.setState({
			mapExpanded: !this.state.mapExpanded
		});
	} 
	handleResolveClick(id) {
		var formData = new FormData(); 
		formData.append('id', id);
		  return fetch(`${process.env.REACT_APP_API_URL}/api/segmentleaks/${this.props.match.params.id}`, {
			method: "PUT",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify(formData), 
		})
			.then((res) => {
				if (res.ok) {
					this.setState({
						leakResolved: !this.state.leakResolved
					}); 
				 this.props.history.go(0); 
				}
			})
			.catch((err) => {
				this.setState({
					error: err
				});
			});
	}

	segmentMap = (
		<div className="segment-map">
			<Map type={Globals.COMPONENT_TYPES.SEGMENT} id={parseInt(this.props.match.params.id)}/>
		</div>
	);

	getSeverityClass = (severity) => severity.toLowerCase();

	render() {
		const { error, loading, segment } = this.props; 
		if (loading) {
			return <Loader />;
		}
		if (error) {
			return <Error404 />;
		}
		if (!loading && segment.length < 1) {
			return <Error404 />;
		}
		const selectedSegment = segment[0];
		const {
			status,
			entityId,
			severity,
			cost,
			litresPerHour,
			typeLitres,
			totalLitres
		} = selectedSegment;

		const severity_fun = this.getSeverityClass(severity);
		const resolved = parseInt(status) === 1 ? true : false;
		const leakInfo = (
			<div>
        <img className = "back-icon" 
					src = {back_button}
					alt = "backButton"
					onClick={() => this.props.history.push('/alert') }
				/>
        <div className="leak-info">
					<h2 className={!resolved ? severity_fun : 'leak-resolved'}>
						{`Segment ${entityId} ${resolved ? 'was' : 'is'} Leaking`}
					</h2>
					<p className={!resolved ? severity_fun : ''}>
						{severity}
					</p>
					<h1 className={!resolved ? severity_fun : 'leak-resolved'}>
						R {cost.toFixed(2)}
					</h1>
					<p className={!resolved ? severity_fun : 'leak-resolved'}>
						is being lost per hour!
					</p>
					<p>Loosing {litresPerHour.toFixed(0)}&#x2113; per hour</p>
					<p> no leak would be 0&#x2113; per hour</p>
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
				{this.state.mapExpanded ? this.segmentMap : null}
				<p className="wastage-label">wastage</p>
				<WastageSummary
					severity={severity}
					litres={typeLitres.toFixed(0)}
					percent={(typeLitres / totalLitres * 100).toFixed(0)}
				/>
				{!resolved ? (
					<div>
						<button
							onClick={() => this.handleResolveClick(entityId)}
							disabled={this.state.leakResolved}
							className="resolved-leak-button"
						>
							LOG AS RESOLVED
						</button>
						<small>the problem is fixed click here</small>
					</div>
				) : (
					<p className="logged-issue-text">ISSUE WAS LOGGED</p>
				)}
			</div>
		);
		return <div>{leakInfo}</div>;
	}
}

SegmentLeak.propTypes = {
	fetchSegment: PropTypes.func.isRequired,
	segment: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
	segment: state.segment.item,
	loading: state.segment.loading,
	error: state.segment.error
});
export default connect(mapStateToProps, { fetchSegment })(SegmentLeak);
