import React, { Component } from 'react';
import TankComponent from '../Components/TankComponent';
import PumpButton from './../Components/PumpButton';
import '../Stylesheets/_tankInfo.scss';
import GraphLine from '../Components/DailyTankGraph';
import Map from '../Components/Map';
import HomeComponent from  '../Pages/Home';
import Home from './Home';

class TankInformation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mapExpanded: false,
			id: this.props.match.params.id
		};
	}
	handleMapExpand() {
		this.setState({
			mapExpanded: !this.state.mapExpanded,
		});
	}

	segmentMap = (
		<div className="segment-map2">
			<Map height="300px" />
			<hr />
		</div>
	);

	render() {
		return (
			<div>
				<img className = "backIcon" 
				src = 'images/back_button.png'
				alt = "backButton"
				onClick={() => window.location =<Home/>}/>
				<TankComponent id={this.state.id} />
				<PumpButton id={this.state.id} />
				<img
					id="map-toggle1"
					src={this.state.mapExpanded === false ? 'images/map_expand.png' : 'images/map_close.png'}
					alt="segment-map"
					onClick={() => this.handleMapExpand()}
				/>
				{this.state.mapExpanded ? this.segmentMap : null}
				<GraphLine className="UsageTnk" id={this.state.id}/>
			</div>
		);
	}
}
export default TankInformation;
