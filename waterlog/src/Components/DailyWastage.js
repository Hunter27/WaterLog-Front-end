import React from 'react';
import { Line, defaults } from 'react-chartjs-2';
import {Globals } from './../Globals';
import {mapDataTime} from '../utils';

const DailyWastageComponent = (props) => { 
  var labelX = props.props.placeholder.map(a => (new Date(a).getHours() + ":00"));
  var myData = props.props.dailyWaste.dataPoints;
  let dataY = mapDataTime(myData); 
  var sum = dataY.reduce((a, b) => a + b, 0); 
  var data = {
    labels: labelX,
    datasets: [
      {
        label: 'Liters',
        data: dataY,
        fill: true,
        borderColor: '#56ccf7',
        backgroundColor: '#56ccf7',
        pointBackgroundColor: '#56ccf7',
        pointRadius: 5,
        pointHitRadius: 5
      }
    ]
  }
  var options = {
    defaultFontFamily: "Roboto",
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'hours',
          fontColor: '#eceff1'
        },
        ticks: {
            fontColor: '#eceff1',
          major: {
            fontStyle: 'bold',
            fontColor: '#eceff1'
          }
        },
        gridLines: {
          display: false,
          color : '#eceff1'
        }
        
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'liters',
          fontColor:'#eceff1'
        },
        ticks: {
          fontColor: '#eceff1'
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
      <div className="head"><b>R {(Math.round(sum * Globals.WATER_COST))}</b><b className="dailysubhead"> lost so far</b></div> 
      <Line options={options} data={data} />
    </div>
  )
}
export default DailyWastageComponent;
