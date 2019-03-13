import React, { Component } from 'react';
import { getStatusIcon } from '../utils';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchFilteredAlerts } from '../actions/FilterAction';

class AlertsFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      segmentFilterOpen: false,
      sensorFilterOpen: false,
      severityFilterOpen: false,
      severitySelected: false,
      segmentNumber: 0,
      sensorType: 0,
      sensorNumber: 0,
      severity: 0
    };

    this.severityLevels = {
      low: { text: "low", number: 1, selected: false },
      medium: { text: "medium", number: 2, selected: false },
      high: { text: "high", number: 3, selected: false }
    }

    this.segmentInput = {};
    this.pipeSensorInput = {};
    this.tankSensorInput = {};
    this.resetFilter = this.resetFilter.bind(this);
    this.submitFilter = this.submitFilter.bind(this);
    this.handleSeverityClick = this.handleSeverityClick.bind(this);
    this.radioRow = this.radioRow.bind(this);
    this.severityRow = this.severityRow.bind(this);
  }

  handleSeverityClick = (severityLevel) => {
    this.severityLevels.low.selected = false;
    this.severityLevels.medium.selected = false;
    this.severityLevels.high.selected = false;
    switch (severityLevel) {
      case 1: //low
        this.severityLevels.low.selected = true;
        break;
      case 2: //medium
        this.severityLevels.medium.selected = true;
        break;
      case 3: //high
        this.severityLevels.high.selected = true;
        break;
      default:
        break;
    }
    this.setState({
      severity: severityLevel
    });
  };

  resetFilter = () => {
    this.severityLevels.low.selected = false;
    this.severityLevels.medium.selected = false;
    this.severityLevels.high.selected = false;
    this.setState({
      segmentFilterOpen: false,
      sensorFilterOpen: false,
      severityFilterOpen: false,
      sensorClicked: false,
      sensorClicked: false,
      segmentNumber: 0,
      sensorType: 0,
      sensorNumber: 0,
      severity: 0
    });
  };

  submitFilter = () => {
    const criteria = {
      segment: this.state.segmentNumber,
      sensorType: this.state.sensorType,
      sensorNumber: this.state.sensorNumber,
      severity: this.state.severity
    };
    fetchFilteredAlerts(criteria);
    this.props.close();
  };

  radioRow(value, id, label) {
    return (
      <tr className="no-line">
        <td className="checkbox-cell"></td>
        <td className="alert-filter-space">
          <input
            type="radio"
            value={value}
            id={id}
            name="sensor"
            onChange={(e) => { this.setState({ sensorType: parseInt(e.target.value) }); }}
          />
          <label className="no-text-underline" for={id}>{label}</label>
        </td>
      </tr>
    )
  }

  severityRow(itemText, itemNumber, selected, line) {
    return (
      <tr
        className={line ? "" : "no-line"}
        onClick={() => {
          this.handleSeverityClick(itemNumber);
        }}>
        <td className="checkbox-cell"></td>
        <td>
          <div className={`${selected ? "clicked" : ""}`}>{itemText}</div>
          <div className="with-icon"><img src={getStatusIcon(itemText)} /></div>
        </td>
      </tr>
    )
  }
  render() {
    return (
      <div>
        <h1 className="alerts-header">Alerts Filter</h1>
        <div className="filter-contents">
          <table>
            <tr className={`${this.state.segmentFilterOpen ? 'no-line' : ''}`}
              onClick={() => { this.setState({ segmentFilterOpen: !this.state.segmentFilterOpen }); }}>
              <td className="checkbox-cell">
                <input type="checkbox" checked={this.state.segmentFilterOpen} />
              </td>
              <td>Segment</td>
            </tr>
            {this.state.segmentFilterOpen ? (
              <tr>
                <td colSpan="2">
                  <input
                    type="number"
                    ref={(input) => (this.segmentInput = input)}
                    onChange={(event) => { this.setState({ segmentNumber: parseInt(event.target.value) }) }}
                    defaultValue="Type a number"
                    placeholder="Type a number"
                    min="0"
                    max="10"
                  />
                </td>
              </tr>
            ) : null
            }
            <tr className={`${this.state.sensorFilterOpen ? 'no-line' : ''}`}
              onClick={() => { this.setState({ sensorFilterOpen: !this.state.sensorFilterOpen }) }}>
              <td className="checkbox-cell"><input type="checkbox" checked={this.state.sensorFilterOpen} /></td>
              <td>Sensor</td>
            </tr>
            {
              this.state.sensorFilterOpen ? (
                <div hidden={true}>
                  {this.radioRow("1", "tank", "tank sensor")}
                </ div>
              ) : null
            }
            {
              this.state.sensorFilterOpen ? (
                this.radioRow("2", "pipe", "pipe sensor")
              ) : null
            }
            {this.state.sensorFilterOpen ? (
              <tr>
                <td colSpan="2">
                  <input
                    type="number"
                    ref={(input) => (this.segmentInput = input)}
                    onChange={(event) => { this.setState({ sensorNumber: parseInt(event.target.value) }) }}
                    defaultValue="Type a number"
                    placeholder="Type a number"
                    min="0"
                    max="10"
                  />
                </td>
              </tr>
            ) : null
            }
            <tr className={`${this.state.severityFilterOpen ? 'no-line' : ''}`}
              onClick={() => { this.setState({ severityFilterOpen: !this.state.severityFilterOpen }) }}>
              <td className="checkbox-cell"><input type="checkbox" checked={this.state.severityFilterOpen} /></td>
              <td>Severity</td>
            </tr>
            {
              this.state.severityFilterOpen ? (
                <>
                  {(() => {
                    const high = this.severityLevels.high;
                    return this.severityRow(high.text, high.number, high.selected);
                  })()}
                  {(() => {
                    const medium = this.severityLevels.medium;
                    return this.severityRow(medium.text, medium.number, medium.selected);
                  })()}
                  {(() => {
                    const low = this.severityLevels.low;
                    return this.severityRow(low.text, low.number, low.selected, true);
                  })()}
                </>
              ) : null
            }
            <tr hidden={true}>
              <td className="checkbox-cell"><input type="checkbox" /></td>
              <td>Tank</td>
            </tr>
            <tr>
              <td colSpan="2">
                <button id="reset-filter" onClick={this.resetFilter}>
                  Clear all
                </button>
                <div className="filter-alert-button-div">
                  <button className="left" onClick={() => {
                    this.resetFilter();
                    this.props.close();
                  }}>
                    Cancel
                  </button>
                  <button className="right" onClick={() => {
                    this.submitFilter();
                  }}>
                    Apply
                  </button>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    );
  }
}

AlertsFilter.propTypes = {
  fetchFilteredAlerts: PropTypes.func.isRequired,
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  alerts: state.alerts.items,
  loading: state.alerts.loading,
  page: state.alerts.page,
  error: state.alerts.error
});

export default connect(mapStateToProps, { fetchFilteredAlerts })(AlertsFilter);
