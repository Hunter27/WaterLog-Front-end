import React, { Component } from 'react';
import { LowStatusIcon, MediumStatusIcon, HighStatusIcon } from './AlertBox';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchSegmentsLeaks } from '../actions/SegmentLeaksActions';


export const getStatusIcon = function (severity) {
	switch (severity.toLowerCase()) {
		case 'high':
			return HighStatusIcon();
		case 'low':
			return LowStatusIcon();
		case 'normal':
			return MediumStatusIcon();
		default:
			return null;
	}
};
class AlertTableComponent extends Component {
	componentDidMount() {
		this.props.fetchSegmentsLeaks();
	}

	alertInfo = ['DATE', 'DESCRIPTION', 'COST', 'STATUS'];

	render() {
		const { error, loading, leaks } = this.props;

		if (error) {
			return <div>Error! {error.message}</div>;
		}
		if (loading) {
			return <div>Loading...</div>;
		}

		return (
			<table>
				<thead>
					<tr>{this.alertInfo.map((info) => <th key = {info}>{info}</th>)}</tr>
				</thead>
				<tbody>
					{leaks.map((alert) => (
						<tr
							key = {alert.id}
							className = {alert.status === 'Fault' ? 'fault' : ''}
							onClick = {() => (window.location.href = `alert/segment/${alert.id}`)}
						>
							<td>{new Date(alert.originalTimeStamp).toDateString()}</td>
							<td>Section {alert.segmentId} Leak</td>
							<td>{'R ' + alert.cost.Item2 + '/hr'}</td>
							<td>{getStatusIcon(alert.severity)}</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	}
}

AlertTableComponent.propTypes = {
	fetchSegmentsLeaks: PropTypes.func.isRequired,
	leaks: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
	leaks: state.leaks.items,
	loading: state.leaks.loading,
	error: state.leaks.errors
});

export default connect(mapStateToProps, { fetchSegmentsLeaks })(AlertTableComponent);
