import React from 'react';
import { Line, defaults } from 'react-chartjs-2';

const DailyCostsReports = (props) => { 
  let labelX = props.props.dataPoints.map(a => (new Date(a.x).getHours() + ":00"));
  let dataY = props.props.dataPoints.map(a => Math.round(a.y)); 
  let data = {
    labels: labelX,
    datasets: [
      {
        label: 'rands',
        data: dataY,
        fill: true,
        borderColor: 'rgba(255,23,68,1)',
        backgroundColor: 'rgba(255,23,68,0.4)',
        pointBackgroundColor: 'rgba(255,23,68,1)',
        pointRadius: 5,
        pointHitRadius: 5
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
            fontColor: 'rgba(255,0,0,1)'
          }
        },
        gridLines: {
          display: false
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'rands'
        },
        gridLines: {
          display: false
        }
      }]
    }
  }
  defaults.global.legend.display = false;
  return (
    <div className="costs-graph"> 
      <Line options={options} data={data} />
    </div>
  )
}
export default DailyCostsReports;
