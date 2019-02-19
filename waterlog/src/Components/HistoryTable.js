import React, { Component } from 'react';
import { LowStatusIcon, MediumStatusIcon, HighStatusIcon } from './AlertBox';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchSegmentsLeaksHistory } from '../actions/SegmentLeaksHistoryActions';
import Loader from './Loader';

export const getStatusIcon = function (severity) {
	switch (severity.toLowerCase()) {
		case 'high':
			return HighStatusIcon();
		case 'low':
			return LowStatusIcon();
		case 'medium':
			return MediumStatusIcon();
		default:
			return null;
	}
};

const formatDate = (date) => {
	var d = new Date(date),
	month = '' + (d.getMonth() + 1),
	day = '' + d.getDate(),
	year = d.getFullYear();
	
	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;
	
	return [month, day, year].join('/');
}

class HistoryTableComponent extends Component {	
	componentDidMount() {
		this.props.fetchSegmentsLeaksHistory();
	}
	render() {
		const { error, loading, leaks } = this.props;

		if (error) {
			return <div>Error! {error.message}</div>;
		}
		if (loading) {
			return <Loader />
		}
		return (
			
			<table>
				<tbody>
					{leaks.map((history) => (
						<tr
							key = {history.id}
							className ="table-row"						
						>
							<td id ="date" className="grey">{formatDate(history.originalTimeStamp)}</td>
							<td>{"SECTION " + 2 + " LEAK"}</td>
							<td className="grey">{'R ' + history.cost.Item2 + '/hr'}</td>
							<td >{getStatusIcon(history.severity)}</td>
						</tr>
					))}
				</tbody>
			</table>			
		);
	}
}

HistoryTableComponent.propTypes = {
	fetchSegmentsLeaksHistory: PropTypes.func.isRequired,
	leaks: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
	leaks: state.leaks.items,
	loading: state.leaks.loading,
	error: state.leaks.error
});

export default connect(mapStateToProps, { fetchSegmentsLeaksHistory })(HistoryTableComponent);
