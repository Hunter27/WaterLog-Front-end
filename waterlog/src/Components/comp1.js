import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";


import AlertComponent from './../Pages/Alert';
import HomeComponent from './../Pages/Home';
import MapComponent from './../Pages/Map';
import UsageComponent from './../Pages/Usage';

export default class Comp1 extends Component {
  render() {
    return (
      <Router>
        <div className="row">
            <div className="col-3">
                <div className="list-group">
                    <NavLink exact to="/" className="list-group-item list-group-item-action">
                        <img src="images/home.png" alt="'" width="50" height="50"/>
                        Home
                    </NavLink>

                    <NavLink to="/alert" className="list-group-item list-group-item-action">
                        <img src="images/alert.png" alt="'" width="50" height="50"/>
                        Alert
                    </NavLink>

                    <NavLink to="/map" className="list-group-item list-group-item-action">
                        <img src="images/map.png" alt="'" width="50" height="50"/>
                        Map
                    </NavLink>

                    <NavLink   to="/usage" 
                            className="list-group-item list-group-item-action"    
                    >
                        <img src="images/usage.png" alt="'" width="50" height="50"/>
                        Usage
                    </NavLink>
                    
                </div>
            </div>
            <div className="col-8">
                <Route exact path="/" component={HomeComponent} />
                <Route path="/alert" component={AlertComponent} />
                <Route path="/map" component={MapComponent} />
                <Route path="/usage" component={UsageComponent} />
            </div>
        </div>
        
      </Router>
    );
  }
}




