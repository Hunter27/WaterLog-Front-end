import React, { Component } from "react";
import TankComponent from "../Components/TankComponent";
import Tank from './../Components/Tank';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchTankLevelById } from "../actions/TankLevelsByIdAction";
import PumpButton from "./../Components/PumpButton";
import GraphLine from "../Components/DailyTankGraph";
import Error404 from './Error404Page';
import Loader from './../Components/Loader';

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

		console.log('level', level)
    return (
      <div className="tank-info">
				<Tank tank={level} />
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
