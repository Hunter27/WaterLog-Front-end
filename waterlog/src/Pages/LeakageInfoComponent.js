import React, { Component } from 'react';

class LeakageInfoComponent extends Component {
    section = this.props.segment; 
    severity = this.props.severity; 
    waterLost = this.props.waterLost;
    cost = this.props.cost;
    isMapExpanded = false;

    styles = {
        mild: {
            textAlign: 'center',
            color: 'white'
        },
        moderate: {
            textAlign: 'center',
            color: 'white'
        }, 
        severe: {
            textAlign: 'center',
            color:'red'
        }
    }
    expandMap(){
        console.log('map expanded');
        this.isMapExpanded = !this.isMapExpanded;
    }
    displayHistory(id){
        console.log("History for " + id);
    }

    render() {
        return (
            <div style={this.styles.severe}>
                <h2>Segment { this.props.value.leak.segmentId} is Leaking</h2>
                <p>({ this.props.value.leak.severity})</p>
                <h1>R { this.props.value.data.Item2 }</h1>
                <p><strong>is being lost per hour</strong></p>
                <p><strong>Loosing { this.props.value.usage.Item2 } L per hour</strong></p>
                <p>no leak would be 0L per hour</p>
                <img src={this.isMapExpanded ? "images/icons/map-expand.png" : "images/icons/map-close.png"} 
                    alt="expand-map" 
                    height="40px" 
                    width="70px"
                    onClick={()=>this.expandMap()}/>
                {/*  map component here */}
                <hr />
                {/*Unimplemented <NavLink exact to="/alert/segment-history/1">COMPONENT HISTORY</NavLink>                 */}
            </div>
    );
  }
}

export default LeakageInfoComponent;
