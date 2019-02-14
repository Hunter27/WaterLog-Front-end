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
class HistoryTableComponent extends Component {
	constructor(props)
    {
       super(props)
    }
	componentDidMount() {
		this.props.fetchSegmentsLeaksHistory();
	}

	historyInfo = ['DATE', 'DESCRIPTION', 'COST', 'STATUS'];

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
							onClick = {() => (window.location.href = `history/segment/${this.props.match.params.id}`)}
						>
							<td id ="date">{new Date(history.originalTimeStamp).toDateString()}</td>
							<td>{"SECTION " + 2 + " LEAK"}</td>
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
	fetchSegmentsLeaksHistory: PropTypes.func.isRequired,
	leaks: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
	leaks: state.leaks.items,
	loading: state.leaks.loading,
	error: state.leaks.error
});

export default connect(mapStateToProps, { fetchSegmentsLeaksHistory })(HistoryTableComponent);
