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
    const getTankImage = (percent) => {
      if (percent === 100) {
        return <img src="/images/ICONS/100_tank.png"
          width="150"
          height="150"
          alt="50% tank" />
      }
      else if (percent === 50) {
        return <img src="/images/ICONS/50_tank.png"
          width="150"
          height="150"
          alt="50% tank" />
      }
      else if (percent === 0) {
        return <img src="/images/ICONS/0_tank.png"
          width="150"
          height="150"
          alt="50% tank" />
      }
      else if (percent >= 1 && percent <= 40) {
        return (
          <div>
            <img src="/images/ICONS/tank-yellow.png"
              width="150"
              height="150"
              alt="50% tank" />
            <p id="percentage">{percent}%</p>
          </div>
        )
      }
      else if (percent >= 41 && percent <= 79) {
        return (<div> <img src="/images/ICONS/tank-orange.png"
          width="150"
          height="150"
          alt="50% tank" />
          <p  id="percentage">{percent}%</p>
        </div>
        )
      }
    }

    if (error) {
      return <div>Error! {error.message}</div>;
    }
    if (loading) {
      return <div>Loading...</div>;
    }
    var level = levels[3]
    return (
      <div className={"tankComponent"}>
        <h3>{"Tank " + level.tank_Id}</h3>
        {getTankImage(level.percentage)}
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
