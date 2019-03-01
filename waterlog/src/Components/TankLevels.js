import React, { Component } from "react";
import Tank from "./Tank";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchTankLevels } from "./../actions/TankLevelsActions";
class TankLevels extends Component {
  componentWillMount() {
    this.props.fetchTankLevels();
  }
  render() {
    console.log("Error check", this.props);
    const { error, loading } = this.props;
    if (loading) {
      return <div />;
    } else if (error) {
      return <div />;
    } else {
      return (
        <div>
          <p className="home-text">Tank Levels</p>
          <div className="tank-container">
            {this.props.levels.map((tank, index) => (
              <div
                className="tank"
                key={index}
                onClick={() => (window.location = `/alert/tank/${tank.id}`)}
              >
                <Tank key={index} tank={tank} />
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
}
TankLevels.propTypes = {
  fetchTankLevels: PropTypes.func.isRequired,
  levels: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  levels: state.levels.items,
  loading: state.levels.loading,
  error: state.levels.error
});
export default connect(
  mapStateToProps,
  { fetchTankLevels }
)(TankLevels);
