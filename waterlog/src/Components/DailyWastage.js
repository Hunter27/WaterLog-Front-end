import React from 'react';
import Loader from './Loader';
import { Line, defaults } from 'react-chartjs-2';

const DailyWastageComponent = (props) => {
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
        fill: true,          // Don't fill area under the line
        borderColor: 'blue'  // Line color
      }
    ]
  }
  var options = {
    maintainAspectRatio: true,
    //scales: { xAxes: [{ display: false, }], yAxes: [{ display: false, }], }
  }
    defaults.global.legend.display = false;
    return (
      <div className="wastage-graph">
        <Line options={options} data={ data } height="100" />
      </div>
    )
}
export default DailyWastageComponent;
