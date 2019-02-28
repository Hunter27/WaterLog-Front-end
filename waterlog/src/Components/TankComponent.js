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
		if(level.percentageLevel===0){
      return (
        <div>
          <img src={images.tank_red} alt="tank"/>
          <p id="percentage">{level.percentageLevel}%</p>
					<p className="Level"> tank is empty </p>
					<p className="Instruction" > pump should be turn on </p>
        </div>
      );
		}
		else if (level.percentageLevel > 79 && level.percentageLevel < 100) {
			return (
				<div>
					<img src={images.tank_green} className="image" alt="tank"/>
					<p id="percentage">{level.percentageLevel}%</p>
					<p className="Level">optimal level</p>
					<p className="Instruction">pump is on</p>
			</div>
			);
		} else if (level.percentageLevel >= 1 && level.percentageLevel <= 40) {
			return (
				<div>
					<img src={images.tank_yellow} className="image" alt="tank"/>
					<p id="percentage">{level.percentageLevel}%</p>
					<p className="Level">tank is empty  </p>
					<p className="Instruction">pump should be turn on</p>
      
				</div>
			);
		} else if (level.percentageLevel >= 41 && level.percentageLevel <= 79) {
			return (
				<div>
					<img src={images.tank_orange} className="image" alt="tank"/>
					<p id="percentage">{level.percentageLevel}%</p>
					<p className="Level">acceptable level</p>
					<p className="Instruction">pump should be turn off</p>
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
				<h3>{'Tank ' + this.props.id}</h3>
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
