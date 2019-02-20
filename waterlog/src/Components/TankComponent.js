import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTankLevelById } from '../actions/TankLevelsByIdAction';
import '../Stylesheets/_tank.scss';
const images = {
	percent_100: 'images/100_tank.png',
	percent_75: 'images/75_tank.png',
	percent_50: 'images/50_tank.png',
	percent_0: 'images/0_tank.png',
	tank_yellow: 'images/tank-yellow.png',
	tank_orange: 'images/tank-orange.png'
};
export class TankComponent extends Component {
	componentWillMount() {
		this.props.fetchTankLevelById(this.props.id);
	}
	getTankImage = (percent) => {
		if (percent === 100) {
			return <img src={images.percent_100} className="image" alt="100% tank" />;
		} else if (percent === 50) {
			return <img src={images.percent_50} className="image" alt="50% tank" />;
		} else if (percent === 0) {
			return <img src={images.percent_0} className="image" alt="0% tank" />;
		} else if (percent === 75) {
			return <img src={images.percent_75} className="image" alt="75% tank" />;
		} else if (percent >= 1 && percent <= 40) {
			return (
				<div>
					<img src={images.tank_yellow} className="image" alt="50% tank" />
					<p id="percentage">{percent}%</p>
				</div>
			);
		} else if (percent >= 41 && percent <= 79) {
			return (
				<div>
					<img src={images.tank_orange} className="image" alt="50% tank" />
					<p id="percentage">{percent}%</p>
				</div>
			);
		}
	};
	render() {
		const { error, loading, level } = this.props;

		if (error) {
			return <div>Error! {error.message}</div>;
		}
		if (loading) {
			return <div>Loading...</div>;
		}

		return (
			<div className={'tankComponent'}>
				<h3>{'Tank ' + level.tankId}</h3>
				<div className="tankSize">{this.getTankImage(level.percentage)}</div>
				<h5>{level.levelStatus}</h5>
			</div>
		);
	}
}

TankComponent.propTypes = {
	fetchTankLevelById: PropTypes.func.isRequired,
	level: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
	level: state.level.item,
	loading: state.level.loading,
	error: state.level.errors
});
export default connect(mapStateToProps, { fetchTankLevelById })(TankComponent);
