import React, { Component } from 'react';
import DailyUsageComponent from './DailyUsage';
import MonthlyUsageComponent from './MonthlyUsage';
import SeasonalUsageComponent from './SeasonalUsage';
import {
  fetchUsageDaily,
  fetchUsageMonthly,
  fetchUsageSeasonally
} from '../actions/UsageDaily';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchCostsDaily,
  fetchCostsMonthly,
  fetchCostsSeasonally
} from '../actions/CostsReportActions';
import SeasonalCostReports from './SeasonalCostReports';
import DailyCostsReports from './DailyCostsReports';
import MonthlyCostsReports from './MonthlyCostsReports';

class Usage extends Component {
  constructor(props) {
    super(props);

    this.openGraph = this.openGraph.bind(this);
    this.state = {
      display: "daily"
    }
  }
  componentDidMount() {
    this.openGraph("daily");
    this.props.fetchUsageMonthly();
    this.props.fetchUsageDaily();
    this.props.fetchUsageSeasonally();
    this.props.fetchCostsDaily();
    this.props.fetchCostsMonthly();
    this.props.fetchCostsSeasonally();
  }

  openGraph = (graphType) => {
    this.setState({
      display: graphType
    })
  }

  getGraphType = () => {
    if (this.state.display === "daily")
      return <div>
        <p><b>Cost</b></p>
        <DailyCostsReports props={this.props.dailyCost} />
        <hr />
        <p><b>Usage</b></p>
        <DailyUsageComponent props={this.props.dailyUsage} />
      </div>
    else if (this.state.display === "monthly")
      return <div>
        <p><b>Cost</b></p>
        <MonthlyCostsReports props={this.props.monthlyCost} />
        <hr />
        <p><b>Usage</b></p>
        <MonthlyUsageComponent props={this.props.monthlyUsage} />
      </div>
    else if (this.state.display === "seasonal")
      return <div>
        <p><b>Cost</b></p>
        <SeasonalCostReports props={this.props.seasonalCost} />
        <hr />
        <p><b>Usage</b></p>
        <SeasonalUsageComponent props={this.props.seasonUsage} />
      </div>
    else
      return <div>Error has occured</div>
  };

  render() {
    return (
      <div className="wastage">
        <div className="graph-nav tab " id="cost-buttons">
          <button className={`btn-graph-nav tablinks ${this.state.display === "daily" ? "active" : ""}`}
            onClick={(e) => this.openGraph("daily")}
            id="openByDefault"
          >
            Daily
              </button>

          <button className={`btn-graph-nav tablinks ${this.state.display === "monthly" ? "active" : ""}`}
            onClick={(e) => this.openGraph("monthly")}
          >
            Monthly
              </button>
          <button className={`btn-graph-nav tablinks ${this.state.display === "seasonal" ? "active" : ""}`}
            onClick={(e) => this.openGraph("seasonal")}
          >
            Seasonal
              </button>
        </div>
        <div className="tabcontent">
          {this.getGraphType()}
        </div>
      </div>
    )
  }
}

Usage.propTypes = {
  fetchUsageDaily: PropTypes.func.isRequired,
  dailyUsage: PropTypes.object.isRequired,
  fetchUsageMonthly: PropTypes.func.isRequired,
  monthlyUsage: PropTypes.object.isRequired,
  fetchUsageSeasonally: PropTypes.func.isRequired,
  seasonUsage: PropTypes.array.isRequired,
  fetchCostsDaily: PropTypes.func.isRequired,
  dailyCost: PropTypes.object,
  fetchCostsMonthly: PropTypes.func.isRequired,
  monthlyCost: PropTypes.object,
  fetchCostsSeasonally: PropTypes.func.isRequired,
  seasonalCost: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  dailyUsage: state.dailyUsage.item,
  monthlyUsage: state.monthlyUsage.item,
  seasonUsage: state.seasonUsage.items,
  dailyCost: state.dailyCost.item,
  monthlyCost: state.monthlyCost.item,
  seasonalCost: state.seasonalCost.items
})
export default connect(mapStateToProps, {
  fetchUsageDaily,
  fetchUsageMonthly,
  fetchUsageSeasonally,
  fetchCostsDaily,
  fetchCostsMonthly,
  fetchCostsSeasonally
})(Usage);
