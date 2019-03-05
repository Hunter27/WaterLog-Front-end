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
        label: '%',
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
          fontColor:'#ECEFF1'

        },
        ticks: {
          fontColor:'#ECEFF1',
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
          fontColor:'#ECEFF1',
        },
        gridLines: {
          display: false,
          color:'#ECEFF1'
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
