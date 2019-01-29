import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


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
                    <Link to="/" className="list-group-item list-group-item-action">
                        <img src="./icon.ico" alt="'"/>
                        Home
                    </Link>
                    <Link to="/alert" className="list-group-item list-group-item-action">
                        <img src="waterlog/src/icon.ico" alt="'"/>
                        Alert
                    </Link>
                    <Link to="/map" className="list-group-item list-group-item-action">
                        <img src="/" alt="'"/>
                        Map
                    </Link>
                    <Link to="/usage" className="list-group-item list-group-item-action">
                        <img src="/" alt="'"/>
                        Usage
                    </Link>
                    
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




