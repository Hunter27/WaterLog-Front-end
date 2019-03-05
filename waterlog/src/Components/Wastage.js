import React, { Component } from "react";
import DailyWastageComponent from "./DailyWastage";
import MonthlyWastageComponent from "./MonthlyWastage";
import SeasonalWastageComponent from "./SeasonalWastage";
import { fetchWastageDaily } from "../actions/WastageDaily";
import { fetchWastageMonthly } from "../actions/WastageMonthly";
import { fetchWastageSeasonally } from "../actions/WastageSeasonally";
import {fetchPlaceholder} from "../actions/ForecastPlaceholderActions"; 
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loader from "./Loader";
import Error404 from "./Error404";

class Wastage extends Component {
  constructor(props) {
    super(props);
    this.openGraph = this.openGraph.bind(this);
    this.state = {
      display: "daily"
    };
  }
  componentDidMount() {
    this.openGraph("daily");
    this.props.fetchWastageMonthly();
    this.props.fetchWastageDaily();
    this.props.fetchWastageSeasonally();
    this.props.fetchPlaceholder();
  }

  openGraph = graphType => {
    this.setState({
      display: graphType
    });
  };

  getGraphType = () => {
    if (this.state.display === "daily") {
      return <DailyWastageComponent props={this.props} />;
    } else if (this.state.display === "monthly") {
      return <MonthlyWastageComponent props={this.props.monthlyWaste} />;
    } else if (this.state.display === "seasonal") {
      return <SeasonalWastageComponent props={this.props.seasonWaste} />;
    } else {
      return <div>Error has occured</div>;
    }
  };

  render() {
    const {
      dailyError,
      dailyLoading,
      monthlyError,
      monthlyLoading,
      seasonalError,
      seasonalLoading,
      placeholderLoading,
      placeholderError,
      dailyWaste,
      monthlyWaste,
      seasonWaste
    } = this.props;
    if (dailyError || monthlyError || seasonalError || placeholderError) {
      return <Error404 />;
    }
    if ((dailyLoading || monthlyLoading || seasonalLoading || placeholderLoading) && (dailyWaste.length < 1) && (monthlyWaste.length < 1)&& (seasonWaste.length < 1)) {
      return (
        <div>
          <Loader />
        </div>
      );
    }

    return (
      <div className="wastage">
        <p>Wastage</p>
        <div className="graph-nav tab">
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
    );
  }
}

Wastage.propTypes = {
  fetchWastageDaily: PropTypes.func.isRequired,
  dailyWaste: PropTypes.object.isRequired,
  fetchWastageMonthly: PropTypes.func.isRequired,
  monthlyWaste: PropTypes.object.isRequired,
  fetchWastageSeasonally: PropTypes.func.isRequired,
  seasonWaste: PropTypes.array.isRequired,
  placeholder: PropTypes.array.isRequired,
  fetchPlaceholder:PropTypes.func.isRequired 
};

const mapStateToProps = state => ({
  dailyWaste: state.dailyWaste.item,
  monthlyWaste: state.monthlyWaste.item,
  seasonWaste: state.seasonWaste.items,
  dailyLoading: state.dailyWaste.loading,
  dailyError: state.dailyWaste.error,
  monthlyLoading: state.monthlyWaste.loading,
  monthlyError: state.monthlyWaste.error,
  seasonalLoading: state.seasonWaste.loading,
  seasonalError: state.seasonWaste.error,
  placeholder: state.placeholder.item,
  placeholderLoading: state.placeholder.loading,
  placeholderError: state.placeholder.error 
});
export default connect(
  mapStateToProps,
  { fetchWastageDaily, fetchWastageMonthly, fetchWastageSeasonally, fetchPlaceholder }
)(Wastage);
