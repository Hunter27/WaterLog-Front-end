import React, { Component } from 'react';

export default class PumpButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pumpOn: true,
			error: null
		};
	}

	togglePump(id) {
		fetch(`${process.env.REACT_APP_API_URL}/api/pumps/${id}`, 
		{
			method: 'POST',
			mode: 'cors'
		})
		.then(res =>{ 
			if(res.ok)
				this.setState({
					pumpOn: !this.state.pumpOn
				})
		})
		.catch(
			err => { 
				this.setState({
					error: err
				})
			}
		)
	}

	render() {
		return (
			<div>
				<small>{this.state.error ? this.state.error : ''}</small>
				<button onClick={() => this.togglePump(this.props.id)} className="pump-button">
					{!this.state.pumpOn ? 'TURN PUMP ON' : 'TURN PUMP OFF'}
				</button>
			</div>
		);
	}	
}
