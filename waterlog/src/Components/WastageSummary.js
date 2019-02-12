import React, { Component } from 'react';
import ProgressBarComponent from './ProgressBar';

class WastageSummaryComponent extends Component {

  percent = this.props.percent;
  waterLost = this.props.waterLost;

  render() {
    return (
        <div className="wastageSummary">
          <h3 className="wastageSummaryH3">Wastage</h3>
          <div className="wastageSummary mild">
              <h2>{ (this.props.value.Item1).toFixed(2) }L</h2>
              <p>(of the total water used is being lost due to this pipe</p>
                  <ProgressBarComponent percentage={ this.percent} />
          </div>
        </div>
    );
  }
}

export default WastageSummaryComponent;
