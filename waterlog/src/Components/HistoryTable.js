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
class HistoryTableComponent extends Component {
	componentDidMount() {
		this.props.fetchSegmentsLeaks();
	}

	historyInfo = ['DATE', 'DESCRIPTION', 'COST', 'STATUS'];

	render() {
		const { error, loading, history } = this.props;

		if (error) {
			return <div>Error! {error.message}</div>;
		}
		if (loading) {
			return <div>Loading...</div>;
		}

		return (
			<table>
				<thead>
					<tr>{this.historyInfo.map((info) => <th key = {info}>{info}</th>)}</tr>
				</thead>
				<tbody>
					{history.map((history) => (
						<tr
							key = {history.id}
							className = {history.status === 'Fault' ? 'fault' : ''}
							onClick = {() => (window.location.href = `alert/segment/${history.id}`)}
						>
							<td>{new Date(history.originalTimeStamp).toDateString()}</td>
							<td>Section {history.segmentsId} Leak</td>
							<td>{'R ' + history.cost.Item2 + '/hr'}</td>
							<td>{getStatusIcon(history.severity)}</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	}
}

HistoryTableComponent.propTypes = {
	fetchSegmentsHistory: PropTypes.func.isRequired,
	history: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
	history: state.history.items,
	loading: state.history.loading,
	error: state.history.errors
});

export default connect(mapStateToProps, { fetchSegmentsHistory })(HistoryTableComponent);
