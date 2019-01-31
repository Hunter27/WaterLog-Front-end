import React, { Component } from 'react';	
import './../Stylesheets/_monitors.scss';

const APIUri = 'https://localhost:44382/api/monitors';



class MonitorsComponent extends Component {
	
	monitorInfo = ["id","type","max_flow","location","status"];
	faults = 0;

  constructor(props) {
    super(props);
    this.state = {
			data: [{"id":0,"type":"xxxx","max_flow":0.0,"long":0.0,"lat":0.0,"status":"xxx"}],
			faultyMonitors: 0
    };
	}
		
  componentDidMount() {
    fetch(APIUri)
      .then(response => response.json())
      .then(data => {
				this.setState({ data });
			})
      .catch(err => {
          console.log(err)
			});
	}

  render() {
    return(
			<div>
				<h3>Monitors</h3>
				<table> 
					<thead>
						<tr>
							{this.monitorInfo.map(
								info => <th key={info.toUpperCase()}>{ info }</th>
							)}
						</tr>
					</thead>
					<tbody>
						{this.state.data.map(
							monitor => <tr key={monitor.id}
														className={monitor.status==='Fault' ? 'fault' : ''}
							>
								<td>{monitor.id}</td>
								<td>{monitor.type}</td>
								<td>{monitor.max_flow}</td>
								<td>{monitor.lat } : { monitor.long }</td>
								<td>{monitor.status}</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
    );
  }
}

export default MonitorsComponent ;