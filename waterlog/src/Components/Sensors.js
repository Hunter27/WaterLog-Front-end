import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchSensors } from '../actions/SensorActions';

class Sensors extends Component {

  componentWillMount() {
    this.props.fetchSensors();
  }
  render() {
    const sensorItems = this.props.sensors.map(sensor => (
        <div key={sensor.id}> 
          <h3>{sensor.type}{sensor.id}</h3>
          <p>{sensor.status}</p>
          <p>{sensor.max_flow}</p>
        </div>
      ));
    return (
      <div> 
        {sensorItems}
      </div>
    )
  }
}

Sensors.propTypes = {
    fetchSensors: PropTypes.func.isRequired,
    sensors: PropTypes.array.isRequired
  
  };
 
const mapStateToProps = state => ({
    sensors: state.sensors.items
    });

export default connect(mapStateToProps, { fetchSensors })(Sensors);
