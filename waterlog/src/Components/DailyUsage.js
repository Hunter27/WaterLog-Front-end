import React from 'react';
import { Line, defaults } from 'react-chartjs-2'; 
import {mapDataTime} from '../utils';

const DailyUsageComponent = (props) => { 
  let labelX = props.props.placeholder.map(a => (new Date(a).getHours() + ":00")); 
  let myData = props.props.dailyUsage.dataPoints;
  let dataY = mapDataTime(myData); 
  var data = {
    labels: labelX,
    datasets: [
      {
        label: 'liters',
        data: dataY,
        fill: true,         
        borderColor:  '#56ccf7',
        backgroundColor:  '#56ccf7',
        pointBackgroundColor: '#56ccf7',
        pointRadius: 5,
        pointHitRadius: 5
      }
    ]
  }
  var options = {
    scales: {
      xAxes: [ {
        scaleLabel: {
          display: true,
          labelString: 'hours',
          fontColor : '#eceff1'
        },
        ticks: {
          fontColor : '#eceff1',
          major: {
            fontStyle: 'bold',
          }
        },
        gridLines: {
          display: false,
          color : '#eceff1'
        }
      } ],
      yAxes: [ {
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'liters',
          fontColor : '#eceff1'
        },
        ticks: {
          fontColor : '#eceff1'
        },
        gridLines: {
          display: false,
          color : '#eceff1'
        }
      }]
    }
  }
    defaults.global.legend.display = false;
    return (
      <div className="wastage-graph">  
        <Line options={options} data={data} />
      </div>
    )
}
export default DailyUsageComponent;
