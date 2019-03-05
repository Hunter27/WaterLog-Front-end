import React, { Component, Fragment } from "react";
import Tank from "./Tank";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchTankLevels } from "./../actions/TankLevelsActions";
import Loader from './Loader';
import Error404 from'./../Components/Error404'
class TankLevels extends Component {
  componentWillMount() {
    this.props.fetchTankLevels();
	}

	render() {
    const { error, levels, loading } = this.props;
    if (loading && levels.length === 0) {
      return <div><Loader/></div>;
    } else if (error) {
      return <div><Error404/></div>;
    } else {
      return (
        <Fragment>
          <p className="home-text">Tank Levels</p>
          <div className="tank-container">
            {levels.map((tank, index) => (
              <Tank key={index} tank={tank} />
            ))}
          </div>
        </Fragment>
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
