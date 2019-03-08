
import React, { Component } from "react";
import Tank from './../Components/Tank';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchTankLevelById } from "../actions/TankLevelsByIdAction";
import { fetchPumps } from "../actions/PumpActions";
import PumpButton from "./../Components/PumpButton";
import GraphLine from "../Components/DailyTankGraph";
import Error404 from './Error404Page';
import Loader from './../Components/Loader';
import Map from './../Components/Map';
import { Globals } from './../Globals';

class TankInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
			id: this.props.match.params.id,
			pumpOn: true,
			mapExpanded: false
    };
	}
	
	componentWillMount() {
		this.props.fetchTankLevelById(this.state.id);
	}

  handleMapExpand() {
    this.setState({
      mapExpanded: !this.state.mapExpanded
    });
	}
	
	segmentMap = (id) => (
		<div className="segment-map">
			<Map type={Globals.COMPONENT_TYPES.TANK} id={id} />
		</div>
	);

	render() {
		const { error, loading, level } = this.props;
		if (error) {
			return <Error404 />;
		}
		if (loading) {
			return <Loader />;
		}

		const { percentageLevel, optimalLevel } = level;
		
    return (
      <div className="tank-info">
				<img className = "back-icon" 
					src = 'images/back_button.png'
					alt = "backButton"
					onClick={() => this.props.history.goBack()}
				/>
				<Tank tank={level} />
				{percentageLevel === optimalLevel ? <p className="optimal">optimal level</p> : null}
				<p className="p-status">pump is {this.state.pumpOn ? 'on' : 'off'}</p>
				{((parseInt(percentageLevel) >= parseInt(optimalLevel)) && this.state.pumpOn)
					? <p className="p-info">the tank is being overfilled</p>
					: null}
				{percentageLevel <= 5 ? <p className= "t-empty" >the tank is empty</p> : null}
				<PumpButton id={this.state.id} />
				<img
					id="map-toggle"
					src={this.state.mapExpanded === false ?
						'images/map_expand.png' :
						'images/map_close.png'}
					alt="segment-map"
					onClick={() => this.handleMapExpand()}
				/>
				{this.state.mapExpanded ? this.segmentMap(this.state.id) : null}
        <GraphLine className="UsageTnk" id={this.state.id} />
      </div>
    );
  }
}

TankInformation.propTypes = {
	fetchTankLevelById: PropTypes.func.isRequired,
	level: PropTypes.array.isRequired,
	fetchPumps: PropTypes.func.isRequired,
	pump: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
	level: state.level.item,
	tankLoading: state.level.loading,
	tankError: state.level.errors,
	pump: state.pump.item,
	pumpError: state.pump.error,
	pumpLoading: state.pump.loading
});
export default connect(
	mapStateToProps,
	{ fetchPumps, fetchTankLevelById }
)(TankInformation);
