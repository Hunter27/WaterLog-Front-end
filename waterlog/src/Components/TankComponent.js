import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTankLevels } from '../actions/TankLevelsActions';

export class TankComponent extends Component {
  componentWillMount() {
    this.props.fetchTankLevels();
  }
  render() {
    const { error, loading, levels } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }
    if (loading) {
      return <div>Loading...</div>;
    }
    var level = levels[0]
    return (

      <div className={"tankComponent"}>
        <h3>{"Tank " + level.tank_Id}</h3>
        

        <img src="/images/ICONS/100_tank.png"
          width="150"
          height="150"
          alt="50% tank" />

        <h5>{level.level_Status}</h5>
        <h5> {level.instruction}</h5>
      </div>

    );
  }
}
TankComponent.propTypes = {
  fetchTankLevels: PropTypes.func.isRequired,
  levels: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  levels: state.levels.items,
  loading: state.levels.loading,
  error: state.levels.errors
});

export default connect(mapStateToProps, { fetchTankLevels })(TankComponent);
