import React, { Component } from "react";
import DailyUsageComponent from "./DailyUsage";
import MonthlyUsageComponent from "./MonthlyUsage";
import SeasonalUsageComponent from "./SeasonalUsage";
import { fetchUsageDaily } from "../actions/UsageDaily";
import { fetchUsageMonthly } from "../actions/UsageMonthly";
import { fetchUsageSeasonally } from "../actions/UsageSeasonally";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchCostsDaily } from "../actions/CostsReportActions";
import { fetchCostsMonthly } from "../actions/CostsMonthlyReportActions";
import { fetchCostsSeasonally } from "../actions/CostsSeasonalReportActions";
import SeasonalCostReports from "./SeasonalCostReports";
import DailyCostsReports from "./DailyCostsReports";
import MonthlyCostsReports from "./MonthlyCostsReports";
import Loader from "./Loader";
import Error404 from "./Error404";

class Usage extends Component {
  constructor(props) {
    super(props);

    this.openGraph = this.openGraph.bind(this);
    this.state = {
      display: "daily"
    };
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

  openGraph = graphType => {
    this.setState({
      display: graphType
    });
  };

  getGraphType = () => {
    if (this.state.display === "daily")
      return (
        <div>
          <p className="bold">Cost </p>
          <DailyCostsReports props={this.props.dailyCost} />
          <hr id="divide" />
          <p className="bold">Usage</p>
          <DailyUsageComponent props={this.props.dailyUsage} />
        </div>
      );
    else if (this.state.display === "monthly")
      return (
        <div>
          <p className="bold">Cost</p>
          <MonthlyCostsReports props={this.props.monthlyCost} />
          <hr id="divide" />
          <p className="bold">Usage</p>
          <MonthlyUsageComponent props={this.props.monthlyUsage} />
        </div>
      );
    else if (this.state.display === "seasonal")
      return (
        <div>
          <p className="bold">Cost</p>
          <SeasonalCostReports props={this.props.seasonalCost} />
          <hr id="divide" />
          <p className="bold">Usage</p>
          <SeasonalUsageComponent props={this.props.seasonUsage} />
        </div>
      );
    else return <div>Error has occured</div>;
  };

  render() {
    const {
      dailyError,
      dailyLoading,
      monthlyError,
      monthlyLoading,
      seasonalError,
      seasonalLoading
    } = this.props;
    if (dailyError || monthlyError || seasonalError) {
      return <Error404 />;
    }
    if (dailyLoading || monthlyLoading || seasonalLoading) {
      return <Loader />;
    }
    return (
      <div>
        <p className="home-text">
          <b>WATER USAGE & COST</b>
        </p>
        <div className="wastage">
          <div className="graph-nav tab " id="cost-buttons">
            <button
              className={`btn-graph-nav tablinks ${
                this.state.display === "daily" ? "active" : ""
              }`}
              onClick={e => this.openGraph("daily")}
              id="openByDefault"
            >
              Daily
            </button>

            <button
              className={`btn-graph-nav tablinks ${
                this.state.display === "monthly" ? "active" : ""
              }`}
              onClick={e => this.openGraph("monthly")}
            >
              Monthly
            </button>
            <button
              className={`btn-graph-nav tablinks ${
                this.state.display === "seasonal" ? "active" : ""
              }`}
              onClick={e => this.openGraph("seasonal")}
            >
              Seasonal
            </button>
          </div>
          <div className="tabcontent">{this.getGraphType()}</div>
        </div>
      </div>
    );
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

const mapStateToProps = state => ({
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
  seasonalError: state.seasonUsage.error
});
export default connect(
  mapStateToProps,
  {
    fetchUsageDaily,
    fetchUsageMonthly,
    fetchUsageSeasonally,
    fetchCostsDaily,
    fetchCostsMonthly,
    fetchCostsSeasonally
  }
)(Usage);
