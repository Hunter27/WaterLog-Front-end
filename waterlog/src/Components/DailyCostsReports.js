import React from 'react';
import { Line, defaults } from 'react-chartjs-2';

const DailyCostsReports = (props) => {
  let labelX = props.props.dailyCost.dataPoints.map(a => (new Date(a.x).getHours() + ":00"));
  let dataY = props.props.dailyCost.dataPoints.map(a => Math.round(a.y)); 
  const {yIntercept, slope} = props.props.forecastDaily[0];

  const startX = Math.floor((new Date(props.props.dailyCost.dataPoints[0].x).getTime()) / 1000); 
  const lastX = Math.floor((new Date(props.props.dailyCost.dataPoints[labelX.length-1].x).getTime()) / 1000); 

  let forecast = [];
  for(let i = startX; i <= lastX; i = i + 3600){
    forecast.push(slope*i + yIntercept);
  }
 
  console.log(startX,lastX,yIntercept,slope)
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
      },
      {
        label: 'forecast',
        data: forecast,
        fill: true,
        borderColor: 'rgb(0,191,255)', 
        pointBackgroundColor: 'rgb(0,191,255)',
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
