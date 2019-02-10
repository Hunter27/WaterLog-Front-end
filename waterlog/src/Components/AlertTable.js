import React, { Component } from 'react';
import { LowStatusIcon, MediumStatusIcon, HighStatusIcon } from './AlertBox';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchSegmentsLeaks } from '../actions/SegmentLeaksActions';

class AlertTableComponent extends Component {
	componentWillMount() {
		this.props.fetchSegmentsLeaks();
	}
	alertInfo = [ 'DATE', 'DESCRIPTION', 'COST', 'STATUS' ];

	render() {
		
		return (
			<table>
				<thead>
					<tr>{this.alertInfo.map((info) => <th key={info}>{info}</th>)}</tr>
				</thead>
				<tbody>
					{this.props.leaks.map((alert) => (
						<tr
						key={alert.id}
						className={alert.status === 'Fault' ? 'fault' : ''}
							onClick={() => (window.location.href =  `alert/segment/${alert.id}`)}
							>
							<td>{new Date(alert.originalTimeStamp).toDateString()}</td>
							<td>Section {alert.segmentId} Leak</td>
							<td>R{alert.cost}  /hr</td>
						<td>
									{(() => {
										
						    switch (alert.severity) {
								case 'high':
								return HighStatusIcon();
								case 'low':
								return LowStatusIcon();
								case 'normal':
								return MediumStatusIcon();
								default:
								return null;
								}
									})()}
						</td>
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

const mapStateToProps = state => ({
	leaks: state.leaks.items
});

export default connect(mapStateToProps, { fetchSegmentsLeaks })(AlertTableComponent);
