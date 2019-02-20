import React from 'react';
import { Line, defaults } from 'react-chartjs-2';

const DailyCostsReports = (props) => { 
  let labelX = props.props.dataPoints.map(a => (new Date(a.x).getHours() + ":00"));
  let dataY = props.props.dataPoints.map(a => a.y);
  let today = new Date(Date.now());
  let data = {
    labels: labelX,
    datasets: [
      {
        label: 'rands',
        data: dataY,
        fill: true,
        borderColor: 'rgba(255,0,0,0)',
        backgroundColor: 'rgba(255,0,0,0.4)'
      }
    ]
  }
  var options = {
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'hours'
        },
        ticks: {
          major: {
            fontStyle: 'bold',
            fontColor: 'rgba(255,0,0,0)'
          }
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'rands'
        }
      }]
    }
  }
  defaults.global.legend.display = false;
  return (
    <div className="costs-graph">
      <div className="date">{"Today is : " + today.getDay() + "/" + today.getMonth() + "/" + today.getFullYear()}</div>
      <Line options={options} data={data} />
    </div>
  )
}
export default DailyCostsReports;
