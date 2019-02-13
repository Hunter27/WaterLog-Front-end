import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { generateLinearForecast, ForecastType } from '../actions/CostForecastActions';
import Loader from './Loader';

class CostForecastComponent extends Component {
	componentDidMount() {
		this.props.generateLinearForecast(ForecastType.DAILY);
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
			
			<div>here</div>	
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
