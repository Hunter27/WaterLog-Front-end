
import React, { Component } from "react";
import Tank from './../Components/Tank';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchTankLevelById } from "../actions/TankLevelsByIdAction";
import PumpButton from "./../Components/PumpButton";
import GraphLine from "../Components/DailyTankGraph";
import Error404 from './Error404Page';
import Loader from './../Components/Loader';
import Home from './Home';

class TankInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id
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

	render() {
		const { error, loading, level } = this.props;
		if (error) {
			return <Error404 />;
		}
		if (loading) {
			return <Loader />;
		}

    return (
      <div className="tank-info">
				<img className = "back-icon" 
				src = 'images/back_button.png'
				alt = "backButton"
				onClick={() => window.location.href ='/'}/>
				<Tank tank={level} />
				{true ? <p>optimal level</p> : null}
				<p>pump is {true ? 'on' : 'off'}</p>
				{true ? <p>the tank is being overfilled</p> : null}
				{true ? <p>the tank is empty</p> : null}
        <PumpButton id={this.state.id} />
        <img
          id="map-toggle"
          src={
            this.state.mapExpanded === false
              ? "images/map_expand.png"
              : "images/map_close.png"
          }
          alt="segment-map"
          onClick={() => this.handleMapExpand()}
        />
        <GraphLine className="UsageTnk" id={this.state.id} />
      </div>
    );
  }
}

TankInformation.propTypes = {
	fetchTankLevelById: PropTypes.func.isRequired,
	level: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
	level: state.level.item,
	loading: state.level.loading,
	error: state.level.errors
});
export default connect(
	mapStateToProps,
	{ fetchTankLevelById }
)(TankInformation);
