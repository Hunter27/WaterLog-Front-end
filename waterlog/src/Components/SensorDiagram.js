import React, { Component } from 'react'

export default class SensorDiagram extends Component {
  render() {
    return (
        <div id="sensor-diagram">
            <div id="line"></div>
            <div id="first" className="sensor">{1}</div>
            <div id="mid" className="sensor faulty">{2}</div>
            <div id="last" className="sensor">{3}</div>
        </div>
    )
  }
}
