import React, { Component } from 'react';
import DailyUsageComponent from './DailyUsage';
import MonthlyUsageComponent from './MonthlyUsage';
import SeasonalUsageComponent from './SeasonalUsage';
import { fetchUsageDaily } from '../actions/UsageDaily';
import { fetchUsageMonthly } from '../actions/UsageMonthly';
import { fetchUsageSeasonally } from '../actions/UsageSeasonally';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCostsDaily } from '../actions/CostsReportActions';
import { fetchCostsMonthly } from '../actions/CostsMonthlyReportActions';
import { fetchCostsSeasonally } from '../actions/CostsSeasonalReportActions';
import SeasonalCostReports from './SeasonalCostReports';
import DailyCostsReports from './DailyCostsReports';
import MonthlyCostsReports from './MonthlyCostsReports';
import { fetchCostsForecastDaily } from '../actions/CostsDailyForecastAction';
import { fetchCostsForecastMonthly } from '../actions/CostsMonthlyForecastAction';
import Loader from './Loader';
import { fetchPlaceholder } from "../actions/ForecastPlaceholderActions";
import Error404 from './Error404';

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
    this.props.fetchCostsForecastDaily();
    this.props.fetchCostsForecastMonthly();
    this.props.fetchPlaceholder();
  }

  openGraph = (graphType) => {
    this.setState({
      display: graphType
    })
  }

  getGraphType = () => {
    if (this.state.display === "daily")
      return <div>
        <p className="bold">Cost </p>
        <DailyCostsReports props={this.props} />
        <hr className="divide" />
        <p className="bold">Usage</p>
        <DailyUsageComponent props={this.props} />
      </div>
    else if (this.state.display === "monthly")
      return <div>
        <p className="bold">Cost</p>
        <MonthlyCostsReports props={this.props} />
        <hr className="divide" />
        <p className="bold">Usage</p>
        <MonthlyUsageComponent props={this.props.monthlyUsage} />
      </div>
    else if (this.state.display === "seasonal")
      return <div>
        <p className="bold">Cost</p>
        <SeasonalCostReports props={this.props.seasonalCost} />
        <hr className="divide" />
        <p className="bold">Usage</p>
        <SeasonalUsageComponent props={this.props.seasonUsage} />
      </div>
    else
      return <div>Error has occured</div>
  };

  render() {
    const { dailyError,
      dailyLoading,
      monthlyError,
      monthlyLoading,
      seasonalError,
      dailyCostForecastLoading,
      dailyCostForecastError,
      monthlyCostForecastLoading,
      monthlyCostForecastError,
      placeholderLoading,
      placeholderError,
      dailyUsage,
      dailyCost,
      monthlyUsage,
      monthlyCost,
      seasonUsage,
      seasonalCost,
      forecastDaily,
      forecastMonthly,
      seasonalLoading } = this.props;

    if ((dailyError || monthlyError|| seasonalError || dailyCostForecastError||
    monthlyCostForecastError || placeholderError)&& 
    (dailyUsage.length < 1)&& (monthlyUsage.length < 1)&& (seasonUsage.length < 1)&& 
    (dailyCost.length < 1)&& (monthlyCost.length < 1)&& (seasonalCost.length < 1)) {
      return <div>Error!</div>;
    }
    if ((dailyLoading || monthlyLoading|| seasonalLoading || dailyCostForecastLoading||
    monthlyCostForecastLoading || placeholderLoading)&&
    (forecastDaily.length < 1)&& (forecastMonthly.length < 1)){
      return <Loader />
    }
    
    return (
      <div className="usage-cost">
        <div className="graph-nav tab" id="cost-buttons">
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
  seasonalCost: PropTypes.array.isRequired,
  fetchCostsForecastDaily: PropTypes.func.isRequired,
  forecastDaily: PropTypes.array.isRequired,
  fetchCostsForecastMonthly: PropTypes.func.isRequired,
  forecastMonthly: PropTypes.array.isRequired,
  placeholder: PropTypes.array.isRequired,
  fetchPlaceholder: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  dailyUsage: state.dailyUsage.item,
  monthlyUsage: state.monthlyUsage.item,
  seasonUsage: state.seasonUsage.items,
  dailyCost: state.dailyCost.item,
  monthlyCost: state.monthlyCost.item,
  seasonalCost: state.seasonalCost.items,
  dailyLoading: state.dailyUsage.loading,
  dailyError: state.dailyUsage.error,
  monthlyLoading: state.monthlyUsage.loading,
  monthlyError: state.monthlyUsage.error,
  seasonalLoading: state.seasonUsage.loading,
  seasonalError: state.seasonUsage.error,
  forecastDaily: state.forecastDaily.items,
  dailyCostForecastLoading: state.forecastDaily.loading,
  dailyCostForecastError: state.forecastDaily.error,
  forecastMonthly: state.forecastMonthly.items,
  monthlyCostForecastLoading: state.forecastMonthly.loading,
  monthlyCostForecastError: state.forecastMonthly.error,
  placeholder: state.placeholder.item,
  placeholderLoading: state.placeholder.loading,
  placeholderError: state.placeholder.error
})
export default connect(mapStateToProps, {
  fetchUsageDaily,
  fetchUsageMonthly,
  fetchUsageSeasonally,
  fetchCostsDaily,
  fetchCostsMonthly,
  fetchCostsSeasonally,
  fetchCostsForecastDaily,
  fetchCostsForecastMonthly,
  fetchPlaceholder
})(Usage);
