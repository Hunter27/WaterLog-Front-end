import React from 'react';
import { Line, defaults } from 'react-chartjs-2';

const DailyCostsReports = (props) => {
  let labelX = props.props.placeholder.map(a => (new Date(a).getHours() + ":00"));
  let dataY = props.props.dailyCost.dataPoints.map(a => Math.round(a.y));
  const { yIntercept, slope } = props.props.forecastDaily[0];
  const today = new Date(Date.now());
  let startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  let lastDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59).getTime();
  const startX = Math.floor(startDate / 1000);
  const lastX = Math.floor(lastDate / 1000);

  let forecast = [];
  for (let i = startX; i <= lastX; i = i + 3600) {
    forecast.push(slope * i + yIntercept);
  }

  let data = {
    labels: labelX,
    datasets: [
      {
        label: 'cost',
        data: dataY,
        fill: true,
        borderColor: '#56ccf7',
        backgroundColor: '#56ccf7',
        pointBackgroundColor: '#56ccf7',
        pointRadius: 5,
        pointHitRadius: 5
      },
      {
        label: 'forecast',
        data: forecast,
        fill: true,
        borderColor: '#eceff1', 
        backgroundColor: '#fff',
        pointBackgroundColor: '#eceff1',
        pointRadius: 5,
        pointHitRadius: 5
      }

    ]
  }
  var options = {
    legend: {
      display: true,
      position:'bottom',
      labels: {
          fontColor: '#C8C8C8', 
      }
     },
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'hours',
          fontColor:'#eceff1'
        },
        ticks: {
          fontColor:'#eceff1',
          major: {
            fontStyle: 'bold',
          }
        },
        gridLines: {
          display: false,
          color:'#eceff1'
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'rands',
          fontColor:'#eceff1'
        },
        ticks: {
          fontColor:'#eceff1'
        },
        gridLines: {
          display: false,
          color:'#eceff1'
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
