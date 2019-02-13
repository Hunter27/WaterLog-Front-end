import React, { Component } from 'react';

import Button from './Button';
import Link from './Link';
import WastageSummary from './WastageSummary';

class SegmentLeak extends Component{
    constructor(props){
      super(props);
  
      this.handleResolveClick = this.handleResolveClick.bind(this);
      this.state = {
        mapExpanded: false,
        leakResolved: false
      }
    }
  
    handleMapExpand(){
      this.setState({
        mapExpanded: !this.state.mapExpanded
      });
    }
  
    handleResolveClick(){
      this.setState({
        leakResolved: !this.state.leakResolved
      });
    }
  
    render(){
      return(
        <div>
          <div className="leakInfo">
                  <h2>Section {2} is Leaking</h2>
                  <p>({111111})</p>
                  <h1>R {400}</h1>
                  <p>is being lost per hour!</p>
                  <p>Loosing {20}&#x2113; per hour</p>
                  <p>no leak would be 0&#x2113; per hour</p>
                </div>
                <img src={this.state.mapExpanded === false ? "images/map_expand.png" : "images/map_close.png" } 
                  width="50px" 
                  alt="segment-map"
                  onClick={()=>this.handleMapExpand()}
                />
                <hr />
                <Link to="/alert/segment-history/1" text="component history" />
                <p className="wastegeLabel">wastage</p>
                <WastageSummary />
                <p className={this.state.leakResolved === false ? "default-status" : "leak-unresolved-status"} 
                  id="resolved-status">
                  { this.state.leakResolved === false ? "resolve the problem" : 
                  "there is still a leak, therefore resolving is not yet posible" }
                </p>
                <Button leakResolved={this.state.leakResolved} click={this.handleResolveClick} text="Resolve"/>
        </div>
      )
    }
  }
  export default SegmentLeak;