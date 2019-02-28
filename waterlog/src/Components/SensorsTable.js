import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {  fetchSensors } from '../actions/SensorsActions';
import { formatDate, getStatusIcon } from './../utils'
import Loader from './Loader';

class SensorTableComponent extends Component {	
	componentDidMount() {
		this.props. fetchSensors();
	}
	render() {
		const { error, loading, sensors } = this.props;

		if (error) {
			return <div>Error! {error.message}</div>;
		}
		if (loading) {
			return <Loader />
		}
		return (
			
			<table>
				<tbody>
					{sensors.map((history) => (
						<tr
							key = {history.id}
							className ="table-row"						
						>
							<td id ="date" className="grey">{formatDate(history.originalTimeStamp)}</td>
							<td>{"SENSOR " + history.id + " FAULTY"}</td>
							</tr>
					))}
				</tbody>
			</table>			
		);
	}
}

SensorTableComponent.propTypes = {
	fetchSensors: PropTypes.func.isRequired,
	sensors: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
	sensors: state.sensors.items,
	loading: state.sensors.loading,
	error: state.sensors.error
});
export default connect(mapStateToProps, { fetchSensors })(SensorTableComponent);
