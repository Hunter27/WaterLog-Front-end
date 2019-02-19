import React, { Component } from 'react'
import DailyCostsReports from './DailyCostsReports';
import MonthlyCostsReports from './MonthlyCostsReports';
import { fetchCostsDaily, fetchCostsMonthly } from '../actions/CostsReportActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
        this.props.fetchCostsMonthly()
    }
    openGraph = (graphType) => {
        this.setState({
            display: graphType
        })
    }
    getGraphType = () => { 
      if(this.state.display==="monthly")  
        return <MonthlyCostsReports props={this.props.monthlyCost}/> 
      else 
        return <div>Error has occured</div>
    }
    render() {
        return (
            <div className="wastage">
                <p>Cost</p>
                <div className="graph-nav tab">
      
              <button className={`btn-graph-nav tablinks ${this.state.display === "monthly" ? "active" : ""}`}
                onClick={(e)=>this.openGraph("monthly")}
              >
                Monthly
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
    fetchCostsMonthly: PropTypes.func.isRequired,
    monthlyCost: PropTypes.object
};

const mapStateToProps = (state) => ({
    monthlyCost: state.monthlyCost.item
})

export default connect(mapStateToProps, { fetchCostsMonthly })(CostsReport)
