import React, { Component } from 'react';
import Tank from './Tank'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTankLevels } from './../actions/TankLevelsActions'
class TankLevels extends Component {
  componentWillMount() {
    this.props.fetchTankLevels(this.props.id);
  };
  render() {
    if (this.props.levels.loading)
      return <p>Loading...</p>
    if (this.props.levels.error)
      return <p>Failed to fetch</p>

      console.log(this.props.levels)
    return (
      <div className="tank-container">
        {this.props.levels.map((tank, index) =>
          <div onClick={() => window.location = `/usage/tank/${index + 1}`}><Tank key={index} tank={tank} /></div>
        )}
      </div>
    )
  }
}
TankLevels.propTypes = {
  fetchTankLevels: PropTypes.func.isRequired,
  levels: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  levels: state.levels.items,
  loading: state.levels.loading,
  error: state.levels.errors
});
export default connect(mapStateToProps, { fetchTankLevels })(TankLevels);
