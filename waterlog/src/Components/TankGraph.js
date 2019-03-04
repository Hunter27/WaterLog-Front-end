import React from 'react';
import { Line, defaults } from 'react-chartjs-2';

const TankGraph = (props) => {
  let labelX = props.props.dailytankgraph.dataPoints.map(a => (new Date(a.x).getHours() + ":00"));
  let dataY = props.props.dailytankgraph.dataPoints.map(a => Math.round(a.y));
  var start = new Date(Date.now());
  var end = new Date(Date.now());
  var startT2 = start.setTime("00:00:01");
  var endT2 = end.setTime("23:59:00");
  let startTime = Math.floor(startT2/1000);
  let endTime =  Math.floor(endT2/1000);

  let forecast = [];
  for(let i = startTime; i <= endTime; i = i + 3600){
    forecast.push(1*i + 80);
  }
  
  let data = {
    labels: labelX,
    datasets: [
      {
        label: 'forecast',
        data: forecast,
        fill: true,
        borderColor: '#00BFFF',
        backgroundColor: '#FF1744',

        pointBackgroundColor: '#00BFFF',
        pointRadius: 5,
        pointHitRadius: 5
      },
      
      {
        label: 'rands',
        data: dataY,
        fill: true,
        borderColor: '#17D1FF',
        backgroundColor: '#4F5B62',
        pointBackgroundColor: '#17D1FF',
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
          labelString: 'days',
          fontColor:'rgb(236,239,241)'

        },
        ticks: {
          fontColor:'rgb(236,239,241)',
          major: {
            fontStyle: 'bold',
            fontColor: '#000205'
          }
        },
        gridLines: {
          display: false,
          color:'#ECEFF1'
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'percentage level',
          fontColor:'#ECEFF1'
        },
        ticks: {
          fontColor:'rgb(236,239,241)',
        },
        gridLines: {
          display: false,
          color:'rgb(236,239,241)'
        }
    
      }]
    }
  }
  defaults.global.legend.display = false;
  return (
    <div className="UsageTank">
      <Line options={options} data={data} />
    </div>
  )
}

export default TankGraph; 
