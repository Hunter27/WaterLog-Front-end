import React, { Component } from 'react';
import DailyWastageComponent from './DailyWastage';
import MonthlyWastageComponent from './MonthlyWastage';
import SeasonalWastageComponent from './SeasonalWastage';

class Wastage extends Component {
    constructor(){
      super();
      this.state = {
        display: "daily"
      }
    }
    graphToDisplay(){
      if(this.state.display === "daily")
        return <DailyWastageComponent />
      else if(this.state.display === "montlhy")
        return <MonthlyWastageComponent />
      else if(this.state.display === "seasonal")
        return <SeasonalWastageComponent />
      else
      return <h1>Choose the summary to display</h1>  
    }
  
    openGraph = (e, cityName) => {
      var i, tabcontent, tablinks;
      
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }

      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
    
      document.getElementById(cityName).style.display = "block";
      e.currentTarget.className += " active";
    }
    render(){
      return(
          <div className="wastage">
            <p>Wastage</p>
            <div className="graph-nav tab">
              <button className="btn-graph-nav tablinks"
                onClick={(e)=>this.openGraph(e,"daily")}
              >
                Daily
              </button>
              <button className="btn-graph-nav tablinks"
                onClick={(e)=>this.openGraph(e,"monthly")}
              >
                Monthly
              </button>
              <button className="btn-graph-nav tablinks"
                onClick={(e)=>this.openGraph(e, "seasonal")}
              >
                Seasonal
              </button>
            </div>
            <div className="tabcontent" id="daily">
              <p>R {1000.00} <small>lost so far</small></p>
              <p>({10}% more than normal water usage)</p>
              {this.graphToDisplay()}
            </div>
            <div className="tabcontent" id="monthly">
              monthly wastage graph
            </div>
            <div className="tabcontent" id="seasonal">
              seasonal wastage graph
            </div>
          </div>
      )
    }
}
export default Wastage;

  