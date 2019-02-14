import React from 'react';
import { Line, defaults } from 'react-chartjs-2';

const DailyWastageComponent = (props) => {
  var data = {
    labels: [
      '', '', 
      '', '', 
      '', '', 
      '', '', 
      '', '', 
      '', ''
    ],
    datasets: [
      {
        label: 'gog',
        data: [15,19,27,223,2,44,10,2,25,24,20,19],
        fill: true,         
        borderColor: 'blue'  
      }
    ]
  }
  var options = {
    maintainAspectRatio: true,
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Litres'
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Hours'
        }
      }],
    }     
  }
    defaults.global.legend.display = false;
    return (
      <div className="wastage-graph">
        <p>R {1000.00} <small>lost so far</small></p>
        <p>({10}% more than normal water usage)</p>
        <Line options={options} data={data} height="100"/>
      </div>
    )
}
export default DailyWastageComponent;
