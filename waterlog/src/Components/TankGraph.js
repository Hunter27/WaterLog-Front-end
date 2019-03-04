import React from 'react';
import { Line, defaults } from 'react-chartjs-2';
import {mapDataTime} from '../utils';

const TankGraph = (props) => { 

  let labelX = props.props.placeholder.map(a => (new Date(a).getHours() + ":00"));
  let myData = props.props.dailytankgraph.dataPoints;
  let dataY = mapDataTime(myData); 
  let data = {
    labels: labelX,
    datasets: [ 
      {
        label: 'rands',
        data:  dataY,
        fill: true,
        borderColor: 'rgba(23,209,255,1)',
        backgroundColor: 'rgba(79,91,98,0.4)',
        pointBackgroundColor: 'rgba(23,209,255,1)',
        pointRadius: 3,
        pointHitRadius: 3
      }
    ]
  }
  var options = {
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Days',
          fontColor:'rgb(236,239,241)'

        },
        ticks: {
          fontColor:'rgb(236,239,241)',
          major: {
            fontStyle: 'bold',
            fontColor: 'rgba(0,2,5,0.4)'
          }
        },
        gridLines: {
          display: false,
          color:'rgb(236,239,241)'
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'PercentageLevel',
          fontColor:'rgb(236,239,241)'
        },
        ticks: {
          fontColor:'rgb(236,239,241)',
         gridLines: {
          display: false,
          color:'rgb(236,239,241)'
        }
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
