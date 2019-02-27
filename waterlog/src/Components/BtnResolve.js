import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchSegmentsLeaksResolve } from '../actions/SegmentResolveActions';
import { Globals } from './../Globals';

class BtnResolve extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: "Resolve Issue"
		};
	}

	componentDidMount() {
		this.props.fetchSegmentsLeaksResolve(this.props.id);
	}

	render() {
		const { error, loading, leaksResolves } = this.props;
		if (error) {
			return <div>Error! {error.message}</div>;
		}
		if (loading) {
			return <div>Loading...</div>;
		}
		return (
			<div>
				<h4>{this.state.text}</h4>
				<button
					onClick={() => this.resolve(leaksResolves)}
					className="BtnResolve"
				>
					RESOLVE
			</button>
			</div>
		);
	}

	resolve(leaksObject) {
		leaksObject = this.props.leaksResolves;
		leaksObject.resolvedStatus = "resolved";
		return fetch(`${Globals.API_URL}/api/segmentleaks/${leaksObject.id}`, {
			method: "PUT",
			mode: "cors",
			cache: "no-cache",
			credentials: "same-origin",
			headers: {
				"Content-Type": "application/json",
			},
			redirect: "follow",
			referrer: "no-referrer",
			body: JSON.stringify(leaksObject),}) 
			.then(response => response.json());		
	}
}
BtnResolve.propTypes = {
	fetchSegmentsLeaksResolve: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	leaksResolves: state.leaksResolves.items,
	loading: state.leaksResolves.loading,
	error: state.leaksResolves.errors
});

export default connect(
	mapStateToProps,
	{ fetchSegmentsLeaksResolve }
)(BtnResolve); 
