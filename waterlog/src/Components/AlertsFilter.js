import React, { Component } from 'react'

class AlertsFilter extends Component {
	constructor(props){
		super(props);

		this.state = {
			segmentFilterOpen: false,
			sensorFilterOpen: {
				tank: false,
				pipe: false
			},
			severityFilterOpen: false
		}
	}
	segments = [1,2,3,4,5];
	tankSensors = [1,2,3,4];
	pipeSensors = [1,2,3,4];
	severity = [1,2,3]
  render() {
    return (
      <div>
				<h1 className="alerts-header">Alerts Filter</h1>
				<div className="filter-contents">
					<div>
						<input type="checkbox" onChange={()=>{this.setState({segmentFilterOpen: !this.state.segmentFilterOpen})}} id="segment-filter" name="segment-filter"/>
						<label for="segment-filter">Segment</label>
					</div>
					{this.state.segmentFilterOpen ?
					<ul>
						{this.segments.map((s,i)=><li>{s}</li>)}
					</ul> : null
					}
					<hr />
					<div>
						<div>
							<input type="checkbox" id="sensor-filter" name="" value="sensor-filter" />
							<label for="sensor-filter">Sensor</label>
						</div>
						{this.state.sensorFilterOpen.tank ?
						<ul>
							<li>
								<div>
									<input type="radio" id="tank-filter" name="tank-pipe-filter" value="tank-filter" />
									<label for="tank-filter">tank sensor</label>
								</div>
								<ul>
									{this.tankSensors.map((t,i)=> <li key={i}>{t}</li>)}
								</ul>
							</li>
							<li>
								<div>
									<input type="radio" id="pipe-filter" name="tank-pipe-filter" value="" />
									<label for="pipe-filter">pipe sensor</label>
								</div>
								<ul>
									{this.pipeSensors.map((t,i)=> <li key={i}>{t}</li>)}
								</ul>
							</li>
						</ul> : null
						}
					</div>
					<hr />
					<div>
						<input type="checkbox" id="severity-filter" name="severity-filter" onChange={()=>{this.setState({severityFilterOpen: !this.state.severityFilterOpen})}}/>
						<label for="severity-filter">Severity</label>
					</div>
					{this.state.severityFilterOpen ?
					<ul>
						{this.segments.map((s,i)=><li>{s}</li>)}
					</ul> : null
					}
					<hr />
					<div>
					<input type="checkbox" id="all-filter" name="all-filter" value="1"/>
						<label for="all-filter">All</label>
					</div>  
					<button>DONE</button>
      		</div>
					
				</div>
        
    )
  }
}

export default AlertsFilter;