import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPumps } from '../actions/PumpActions';
import { Globals } from '../Globals';

class PumpButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: 'Toggle pump'
		};
	}

	componentDidMount() {
		this.props.fetchPumps(this.props.id);
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
				<button onClick={() => this.togglePump(leaksResolves)} className="pump-button">
					{this.state.text}
				</button>
			</div>
		);
	}

	togglePump(leaksObject) {
		leaksObject = this.props.leaksResolves;
		leaksObject.resolvedStatus = 'resolved';
		return fetch(`${Globals.API_URL}/api/pumps/${leaksObject.id}`, {
			method: 'PUT',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			},
			redirect: 'follow',
			referrer: 'no-referrer',
			body: ''
		})
			.then((response) => response.json())
			.then((newPump) => {
				this.setState({ text: 'Pump ' + newPump.status });
			});
	}
}

PumpButton.propTypes = {
	fetchPumps: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	leaksResolves: state.pumps.items,
	loading: state.pumps.loading,
	error: state.pumps.errors
});

export default connect(mapStateToProps, { fetchPumps })(PumpButton);
