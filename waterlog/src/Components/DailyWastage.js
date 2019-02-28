import React from 'react';
import { Line, defaults } from 'react-chartjs-2';
import {Globals } from './../Globals';

const DailyWastageComponent = (props) => {
  var labelX = props.props.dataPoints.map(a => (new Date(a.x).getHours() + ":00"));
  var dataY = props.props.dataPoints.map(a => Math.round(a.y));
  var sum = dataY.reduce((a, b) => a + b, 0); 
  var data = {
    labels: labelX,
    datasets: [
      {
        label: 'Liters',
        data: dataY,
        fill: true,
        borderColor: 'rgb(86, 204, 247)',
        backgroundColor: 'rgb(86, 204, 247)',
        pointBackgroundColor: 'rgb(86, 204, 247)',
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
          fontColor:'rgb(236, 239, 241)'
        },
        ticks: {
            fontColor: 'rgb(236, 239, 241)',
          major: {
            fontStyle: 'bold',
            fontColor: 'rgb(236, 239, 241)'
          }
        },
        gridLines: {
          display: false,
          color : 'rgb(236, 239, 241)'
        }
        
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'liters',
          fontColor:'rgb(236, 239, 241)'
        },
        ticks: {
          fontColor: 'rgb(236, 239, 241)'
        },
        gridLines: {
          display: false,
          color : 'rgb(236, 239, 241)'
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
