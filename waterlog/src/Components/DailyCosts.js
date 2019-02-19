import React from 'react';
import { Line, defaults } from 'react-chartjs-2';

const DailyCostComponent = (props) => {
	var data = {
		labels: [
			'Jan', 'Feb', 
			'Mar', 'Apr', 
			'May', 'Jun', 
			'Jul', 'Aug', 
			'Sept', 'Oct', 
			'Nov', 'Dec'
		],
		datasets: [
			{
				label: 'Temperature',
				data: [10,19,27,23,22,4,100,25,23,24,20,19],
				fill: true,         
				borderColor: 'blue'  
			}
		]
	}
  var options = {
    	maintainAspectRatio: true,
  }
    defaults.global.legend.display = false;
    return (
		<div className="wastage-graph">
			<p>R {1000.00} <small>lost so far</small></p>
			<p>({10}% more than normal water usage)</p>
			<Line options={options} data={data}/>
		</div>
    )
}
export default DailyCostComponent;
