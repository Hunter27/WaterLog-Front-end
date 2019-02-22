import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTankLevelById } from '../actions/TankLevelsByIdAction';
import '../Stylesheets/_tank.scss';
import Loader from './Loader';
import Error404 from './Error404';

const images = {
	tank_yellow: 'images/tank-yellow.png',
	tank_orange: 'images/tank-orange.png',
	tank_green: 'images/tank-green.png'
};
export class TankComponent extends Component {
	componentWillMount() {
		this.props.fetchTankLevelById(this.props.id);
	}
	getTankImage = (level) => {
		if (level.percentage > 79 && level.percentage < 100) {
			return (
				<div>
					<img src={images.tank_green} className="image" alt="tank" />
					<p id="percentage">{level.percentage}%</p>
						<p className="tank_description">
							{level.levelStatus}
							{level.instruction}
						</p>
					<p className="tank_description" />
				</div>
			);
		} else if (level.percentage >= 1 && level.percentage <= 40) {
			return (
				<div>
					<img src={images.tank_yellow} className="image" alt="tank" />
					<p id="percentage">{level.percentage}%</p>
					<p>{level.levelStatus}</p>
					<p>{level.instruction}</p>
				</div>
			);
		} else if (level.percentage >= 41 && level.percentage <= 79) {
			return (
				<div>
					<img src={images.tank_orange} className="image" alt="tank" />
					<p id="percentage">{level.percentage}%</p>
					<p>{level.levelStatus}</p>
					<p>{level.instruction}</p>
				</div>
			);
		}
	};
	render() {
		const { error, loading, level } = this.props;

		if (error) {
			return <Error404 />;
		}
		if (loading) {
			return <Loader />;
		}

		return (
			<div className="tankComponent">
				<h3>{'Tank ' + level.tankId}</h3>
				<div className="tankSize">{this.getTankImage(level)}</div>
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
