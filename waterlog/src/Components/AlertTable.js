import React, { Component } from 'react';
import { LowStatusIcon, MediumStatusIcon, HighStatusIcon } from './AlertBox';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchSegmentEvents } from '../actions/SegmentEventsActions';
import Loader from './Loader';

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
		this.props.fetchSegmentEvents();
	}

	//alertInfo = ['DATE', 'DESCRIPTION', 'COST', 'STATUS'];

	render() {
		const { error, loading, events } = this.props;

		if (error) {
			return <div>Error! {error.message}</div>;
		}
		if (loading) {
			return <Loader />
		}
		return (
			<table>
				<tbody>
					{events.map((event) => (
						<tr
							key = {event.id}
							className ="table-row table-row-unseen"
							onClick = {() => (window.location.href = `alert/segment/${event.segmentsId}`)}
						>
							<td className="event-date">{formatDate(event.timeStamp)}</td>
							<td>{`SEGMENT ${event.segmentsId} LEAK`}</td>
							<td>{'R ' + 100 + '/hr'}</td>
							<td>{getStatusIcon('high')}</td>
						</tr>
					))}
				</tbody>
			</table>			
		);
	}
}

AlertTableComponent.propTypes = {
	fetchSegmentEvents: PropTypes.func.isRequired,
	events: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
	events: state.events.items,
	loading: state.events.loading,
	error: state.events.error
});

export default connect(mapStateToProps, { fetchSegmentEvents })(AlertTableComponent);
