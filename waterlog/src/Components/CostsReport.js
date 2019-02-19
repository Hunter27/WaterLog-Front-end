import React, { Component } from 'react'
import DailyCostsReports from './DailyCostsReports';
import MonthlyCostsReports from './MonthlyCostsReports';
import { fetchCostsDaily, fetchCostsMonthly, fetchCostsSeasonally } from '../actions/CostsReportActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SeasonalCostReports from './SeasonalCostReports';

class CostsReport extends Component {
    constructor(props) {
        super(props);
        this.openGraph = this.openGraph.bind(this);
        this.state = {
            display: "daily"
        }
    }
    componentDidMount() {
        this.openGraph("daily");
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
            return <DailyCostsReports props={this.props.dailyCost} />
        else if (this.state.display === "monthly")
            return <MonthlyCostsReports props={this.props.monthlyCost} />
        else if (this.state.display === "seasonal")
            return <SeasonalCostReports props={this.props.seasonalCost} />
        else
            return <div>Error has occured</div>
    }
    render() {
        console.log(this.props);
        return (
            <div className="wastage">
                <p>Cost</p>
                <div className="graph-nav tab">
                <button className={`btn-graph-nav tablinks ${this.state.display === "daily" ? "active" : ""}`}
                onClick={(e)=>this.openGraph("daily")}
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

CostsReport.propTypes = {
    fetchCostsDaily: PropTypes.func.isRequired,
    dailyCost: PropTypes.object,
    fetchCostsMonthly: PropTypes.func.isRequired,
    monthlyCost: PropTypes.object,
    fetchCostsSeasonally: PropTypes.func.isRequired,
    seasonalCost: PropTypes.array.isRequired

};

const mapStateToProps = (state) => ({
    dailyCost: state.dailyCost.item,
    monthlyCost: state.monthlyCost.item,
    seasonalCost: state.seasonalCost.items
})

export default connect(mapStateToProps, { fetchCostsDaily, fetchCostsMonthly, fetchCostsSeasonally })(CostsReport)
