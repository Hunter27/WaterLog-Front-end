import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPumps } from '../actions/PumpActions';

class PumpView extends Component {
	componentDidMount() {
		this.props.fetchPumps(1);
	}

	render() {
		return <div />;
	}
}
PumpView.propTypes = {
	fetchPumps: PropTypes.func.isRequired,
	pumps: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
	pumps: state.pumps.items,
	loading: state.pumps.loading,
	error: state.pumps.errors
});

export default connect(mapStateToProps, { fetchPumps })(PumpView);
