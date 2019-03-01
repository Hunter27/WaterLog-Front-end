import React, { Component } from 'react';
import WastageSummary from './WastageSummary';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchSegment } from '../actions/SegmentAction';
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
			});
	}

	segmentMap = (
		<div className="segment-map">
			<Map height="300px" />
			<hr />
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
		
		const severity_fun = this.getSeverityClass(selectedSegment.severity);
		const leakInfo = (
			<div>
				<div> 
					<h2 className={severity_fun}>{`${selectedSegment.entityName} ${selectedSegment.entityId} ${selectedSegment.entityType}`}</h2>
					<p className={severity_fun}>({selectedSegment.severity})</p>
					<h1 className={severity_fun}>R {selectedSegment.cost.toFixed(2)}</h1> 
					<p className={severity_fun}>is being lost per hour!</p>
					<p className="static-grey">Loosing {selectedSegment.litresPerHour.toFixed(0)}&#x2113; per hour</p>
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
					severity={selectedSegment.severity}
					litres={selectedSegment.typeLitres.toFixed(0)}
					percent={(selectedSegment.typeLitres / selectedSegment.totalLitres * 100).toFixed(0)}
				/>
				{selectedSegment.status == 2 ? (
					<div>
						<button
							onClick={() => this.handleResolveClick(selectedSegment.entityId)}
							disabled={this.state.leakResolved}
							className='resolved-leak-button'
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
		return <div>{leakInfo}</div> ;
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
