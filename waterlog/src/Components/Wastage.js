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
  
    openGraph = (cityName) => {
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
            <div className="tabcontent" id="daily">
              <p>R {1000.00} <small>lost so far</small></p>
              <p>({10}% more than normal water usage)</p>
              <DailyWastageComponent />
            </div>
            <div className="tabcontent" id="monthly">
              <MonthlyWastageComponent />
            </div>
            <div className="tabcontent" id="seasonal">
              <SeasonalWastageComponent />
            </div>
          </div>
      )
    }
}
export default Wastage;

  