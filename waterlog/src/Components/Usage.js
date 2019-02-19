import React, { Component } from 'react';
import DailyUsageComponent from './DailyUsage';
import MonthlyUsageComponent from './MonthlyUsage';
import SeasonalUsageComponent from './SeasonalUsage';
import { fetchUsageDaily,fetchUsageMonthly,fetchUsageSeasonally } from '../actions/UsageDaily';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Usage extends Component {
    constructor(props){
      super(props);

      this.openGraph = this.openGraph.bind(this);
      this.state = {
        display: "daily"
      }
    }
    componentDidMount(){
      this.openGraph("daily");
        this.props.fetchUsageMonthly();
        this.props.fetchUsageDaily();
        this.props.fetchUsageSeasonally();
      
    }
  
    openGraph = (graphType) => {
      this.setState({
        display: graphType
      })
    }

    getGraphType = ()=>{
      if(this.state.display==="daily")
        return <DailyUsageComponent props={this.props.dailyUsage}/>
      else if(this.state.display==="monthly")  
        return <MonthlyUsageComponent props={this.props.monthlyUsage}/>
      else if(this.state.display==="seasonal")
        return <SeasonalUsageComponent props={this.props.seasonUsage}/>
      else 
        return <div>Error has occured</div>

    }

    render(){
        console.log(this.props);
      return(
          <div className="usage">
            <p>Usage</p>
            <div className="graph-nav tab">
              <button className={`btn-graph-nav tablinks ${this.state.display === "daily" ? "active" : ""}`}
                onClick={(e)=>this.openGraph("daily")}
                id="openByDefault"
              >
                Daily
              </button>
              <button className={`btn-graph-nav tablinks ${this.state.display === "monthly" ? "active" : ""}`}
                onClick={(e)=>this.openGraph("monthly")}
              >
                Monthly
              </button>
              <button className={`btn-graph-nav tablinks ${this.state.display === "seasonal" ? "active" : ""}`}
                onClick={(e)=>this.openGraph("seasonal")}
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
  seasonUsage: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  dailyUsage: state.dailyUsage.item,
  monthlyUsage: state.monthlyUsage.item,
  seasonUsage: state.seasonUsage.items
})
export default connect(mapStateToProps, { fetchUsageDaily,fetchUsageMonthly,fetchUsageSeasonally })(Usage);

  