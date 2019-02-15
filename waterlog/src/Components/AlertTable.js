import React, { Component } from 'react';
import { LowStatusIcon, MediumStatusIcon, HighStatusIcon } from './AlertBox';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchSegmentsLeaks } from '../actions/SegmentLeaksActions';
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

class AlertTableComponent extends Component {
	componentDidMount() {
		this.props.fetchSegmentsLeaks();
	}

	render() {
		const { error, loading, leaks } = this.props;

		if (error) {
			return <div>Error! {error.message}</div>;
		}
		if (loading) {
			return <Loader />
		}
		console.log(leaks)
		return (
			
			<table>
				<tbody>
					{leaks.map((leak) => (
						leak.resolvedStatus !== 'resolved' ? 
						<tr
							key = {leak.id}
							className ="table-row table-row-unseen"
							onClick = {() => (window.location.href = `alert/segment/${leak.id}`)}
						>
							<td className="leak-date">{formatDate(leak.originalTimeStamp)}</td>
							<td>{`SEGMENT ${leak.segmentsId} LEAK`}</td>
							<td>{'R ' + leak.cost.Item2 + '/hr'}</td>
							<td>{getStatusIcon(leak.severity)}</td>
						</tr> : null

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
	error: state.leaks.error
});

export default connect(mapStateToProps, { fetchSegmentsLeaks })(AlertTableComponent);
