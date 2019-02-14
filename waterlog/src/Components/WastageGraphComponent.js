import React, { Component } from 'react';
import DailyWastageComponent from './DailyWastage';
class WastageGraphComponent extends Component {
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
        
        else 
          return <div>Error has occured</div>
  
      }
    
      render(){
        return(
            <div className="wastage">
              <p>Wastage History</p>
              <div className="graph-nav tab">
                <button className={`btn-graph-nav tablinks ${this.state.display === "daily" ? "active" : ""}`}
                  onClick={(e)=>this.openGraph("daily")}
                  id="openByDefault"
                >
                  Daily
                </button>
                </div>
            <div className="tabcontent">
              {this.getGraphType()}
            </div> 
          </div>
      )
    }
}
export default WastageGraphComponent;

  