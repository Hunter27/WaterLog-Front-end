import React, { Component } from 'react';
import DailyWastageComponent from './DailyWastage';
import MonthlyWastageComponent from './MonthlyWastage';
import SeasonalWastageComponent from './SeasonalWastage';
import { fetchWastageDaily, fetchWastageMonthly, fetchWastageSeasonally } from '../actions/WastageDaily';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Wastage extends Component {
	constructor(props) {
		super(props);

		this.openGraph = this.openGraph.bind(this);
		this.state = {
			display: 'daily'
		};
	}
	componentDidMount() {
		this.openGraph('daily');
		this.props.fetchWastageMonthly();
		this.props.fetchWastageDaily();
		this.props.fetchWastageSeasonally();
	}

	openGraph = (graphType) => {
		this.setState({
			display: graphType
		});
	};

	getGraphType = () => {
		if (this.state.display === 'daily') return <DailyWastageComponent props={this.props.dailyWaste} />;
		else if (this.state.display === 'monthly') return <MonthlyWastageComponent props={this.props.monthlyWaste} />;
		else if (this.state.display === 'seasonal') return <SeasonalWastageComponent props={this.props.seasonWaste} />;
		else return <div>Error has occured</div>;
	};

	render() {
		return (
			<div className="wastage">
				<p>Wastage</p>
				<div className="graph-nav tab">
					<button
						className={`btn-graph-nav tablinks ${this.state.display === 'daily' ? 'active' : ''}`}
						onClick={(e) => this.openGraph('daily')}
						id="openByDefault"
					>
						Daily
					</button>
					<button
						className={`btn-graph-nav tablinks ${this.state.display === 'monthly' ? 'active' : ''}`}
						onClick={(e) => this.openGraph('monthly')}
					>
						Monthly
					</button>
					<button
						className={`btn-graph-nav tablinks ${this.state.display === 'seasonal' ? 'active' : ''}`}
						onClick={(e) => this.openGraph('seasonal')}
					>
						Seasonal
					</button>
				</div>
				<div className="tabcontent">{this.getGraphType()}</div>
			</div>
		);
	}
}

Wastage.propTypes = {
	fetchWastageDaily: PropTypes.func.isRequired,
	dailyWaste: PropTypes.object.isRequired,
	fetchWastageMonthly: PropTypes.func.isRequired,
	monthlyWaste: PropTypes.object.isRequired,
	fetchWastageSeasonally: PropTypes.func.isRequired,
	seasonWaste: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
	dailyWaste: state.dailyWaste.item,
	monthlyWaste: state.monthlyWaste.item,
	seasonWaste: state.seasonWaste.items
});
export default connect(mapStateToProps, { fetchWastageDaily, fetchWastageMonthly, fetchWastageSeasonally })(Wastage);
