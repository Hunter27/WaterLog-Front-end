import React, { Component } from 'react';
import './../Stylesheets/_alerts.scss';
import { NavLink } from 'react-router-dom';
import { LowStatusIcon, MediumStatusIcon, HighStatusIcon } from './AlertBox';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchSegmentsLeaks } from '../actions/segmentLeaksActions';

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
							onClick={() => (window.location = `/alert/segment/${alert.id}`)}
							>
							<td>{new Date(alert.originalTimeStamp).toDateString()}</td>
							<td>Section {alert.segmentId} Leak</td>
							<td>R{alert.cost}/hr</td>
							<NavLink to={`/alert/segment/${alert.segmentId}`}>
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
							</NavLink>
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
/*
constructor(props) {
	super(props);
	this.state = {
		data: [
			{ id: '1', date: '06/25/2019', desc: 'SECTOR 2 LEAK', cost: 500, status: 'High' },
			{ id: '1', date: '06/25/2019', desc: 'SECTOR 2 LEAK', cost: 500, status: 'Medium' },
			{ id: '1', date: '06/25/2019', desc: 'SECTOR 2 LEAK', cost: 500, status: 'Low' }
		]
	};
}*/