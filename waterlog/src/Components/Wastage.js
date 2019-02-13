import React, { Component } from 'react';
import DailyWastageComponent from './DailyWastage';
import MonthlyWastageComponent from './MonthlyWastage';
import SeasonalWastageComponent from './SeasonalWastage';

class Wastage extends Component {
    constructor(props){
      super(props);

      this.openGraph = this.openGraph.bind(this);
      this.state = {
        display: "daily"
      }
    }
    componentDidMount(){
      this.openGraph("daily");
    }
  
    openGraph = (graphType) => {
      this.setState({
        display: graphType
      })
    }

    getGraphType = ()=>{
      if(this.state.display==="daily")
        return <DailyWastageComponent/>
      else if(this.state.display==="monthly")  
        return <MonthlyWastageComponent/>
      else if(this.state.display==="seasonal")
        return <SeasonalWastageComponent/>
      else 
        return <div>Error has occured</div>

    }

    render(){
      return(
          <div className="wastage">
            <p>Wastage</p>
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
export default Wastage;

  