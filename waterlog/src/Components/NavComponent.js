import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch, Redirect } from 'react-router-dom';

import AlertComponent from '../Pages/Alert';
import HomeComponent from '../Pages/Home';
import MapComponent from '../Pages/Map';
import UsageComponent from '../Pages/Usage';
import SegmentLeak from './SegmentLeak';
import SegmentHistory from './SegmentHistory';

export default class NavComponent extends Component {
	render() {
		return (
			<Router>
        <div className="App">
          <header className="App-header">
            
            <div className="navicons">
              <div className="logo">
                <img src="images/logo.png" height="33px" width="33px" alt="logo"/>
              </div>
              <NavLink exact to="/" className="navicon-container" activeClassName="selected-route">
                <img src="images/home_icon.png" height="33px" width="33px" alt="home"/>
              </NavLink>
              <NavLink  to="/alert"className="navicon-container" activeClassName="selected-route">
                <img src="images/alert_icon.png" height="33px" width="33px" alt="alert"/>
                <span class="badge">{9}</span>
              </NavLink>
              <NavLink exact to="/map" className="navicon-container" activeClassName="selected-route">
                <img src="images/map_icon.png" height="33px" width="33px" alt="map"/>
              </NavLink>
              <NavLink exact to="/usage" className="navicon-container" activeClassName="selected-route">
                <img src="images/usage_icon.png" height="33px" width="33px" alt="usage"/>
              </NavLink>
            </div>
          </header>
          <div className="router-outlet">
            <Switch>
              <Route exact path="/" component={HomeComponent} />
              <Route exact path="/alert" component={AlertComponent} />
              <Route exact path="/alert/segment/:id" component={SegmentLeak} /> 
              <Route exact path="/alert/segment-history/:id" component={SegmentHistory} />
              <Route exact path="/map" component={MapComponent} />
              <Route exact path="/usage" component={UsageComponent} />
              <Route exact path="*" component={HomeComponent} />
            </Switch>
          </div>
        </div>
      </Router>
		);
	}
}

