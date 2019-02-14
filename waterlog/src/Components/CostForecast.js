import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateLinearForecast } from '../actions/CostForecastActions';
import ForecastChartComponent from './ForecastChart'
import Loader from './Loader';

class CostForecastComponent extends Component {
	componentDidMount() {
		this.props.generateLinearForecast(this.props.type);
	}

	render() {
		const { error, loading, lineParameters } = this.props;

		if (error) {
			return <div>Error! {error.message}</div>;
		}
		if (loading) {
			return <Loader />
		}
		return (
			
			<div className="wastage"><ForecastChartComponent  data={lineParameters}/></div>	
		);
	}
}

CostForecastComponent.propTypes = {
	generateLinearForecast: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	lineParameters: state.lineParameters.item,
	loading: state.lineParameters.loading,
	error: state.lineParameters.error
});

export default connect(mapStateToProps, { generateLinearForecast })(CostForecastComponent);
