import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';

import AlertComponent from '../Pages/Alert';
import HomeComponent from '../Pages/Home';
import MapComponent from '../Pages/Map';
import UsageComponent from '../Pages/Usage';
import SegmentLeak from './SegmentLeak';
import SegmentHistory from './SegmentHistory';
import TankInformation from '../Pages/TankInformation';

class NavComponent extends Component {
	constructor(props) {
		super(props);

		this.updateNotificationBadge = this.updateNotificationBadge.bind(this);
		this.state = {
			notifications: 10
		};
	}

	updateNotificationBadge() {
		this.setState({
			notifications: this.state.notifications - 1
		});
	}

	render() {
		return (
			<Router>
				<div className="App">
					<header className="App-header">
						<div className="navicons">
							<div className="logo">
								<img src="images/logo_white.png" alt="logo" />
							</div>
							<NavLink exact to="/" className="navicon-container" activeClassName="selected-route">
								<img src="images/home_icon.png" alt="home" />
							</NavLink>
							<NavLink to="/alert" className="navicon-container" activeClassName="selected-route">
								<img src="images/alert_icon.png" alt="alert" />
								<span className="badge">{this.state.notifications}</span>
							</NavLink>
							<NavLink exact to="/map" className="navicon-container" activeClassName="selected-route">
								<img src="images/map_icon.png" alt="map" />
							</NavLink>
							<NavLink exact to="/usage" className="navicon-container" activeClassName="selected-route">
								<img src="images/usage_icon.png" alt="usage" />
							</NavLink>
						</div>
					</header>
					<div className="router-outlet">
						<Switch>
							<Route exact path="/" component={HomeComponent} />
							<Route exact path="/alert" component={AlertComponent} />
							<Route exact path="/alert/segment/:id" render={(props) => <SegmentLeak {...props} />} />
							<Route exact path="/alert/segment-history/:id" component={SegmentHistory} />
							<Route exact path="/map" component={MapComponent} />
							<Route exact path="/usage" component={UsageComponent} />
							<Route exact path="/usage/tank/:id" render={(props) => <TankInformation {...props} />} />
							<Route exact path="*" component={HomeComponent} />
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}

export default NavComponent;
