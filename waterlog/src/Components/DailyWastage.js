import React from 'react';
import { Line, defaults } from 'react-chartjs-2';
import { Globals } from './../Globals';

const DailyWastageComponent = (props) => {
  var labelX = props.props.dataPoints.map(a => (new Date(a.x).getHours()+":00"));
  var dataY = props.props.dataPoints.map(a => a.y);
  var sum = dataY.reduce((a, b) => a + b, 0);
  var today =  new Date(Date.now());
  var data = {
    labels: labelX,
    datasets: [
      {
        label: 'Liters',
        data: dataY,
        fill: true,         
        borderColor: 'red',
        backgroundColor: 'rgba(255,0,0,0.4)'
      }
    ]
  }
  var options = {
    scales: {
      xAxes: [ {
        scaleLabel: {
          display: true,
          labelString: 'Hours'
        },
        ticks: {
          major: {
            fontStyle: 'bold',
            fontColor: '#FF0000'
          }
        }
      } ],
      yAxes: [ {
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Liters'
        }
      } ]
    }
  }
    defaults.global.legend.display = false;
    return (
      <div className="wastage-graph">
      <div className="head"><b>R {(Math.round(sum*Globals.WATER_COST))}</b><b className="dailysubhead"> lost so far</b></div>
      <div className="date">{"Today is : " + today.getDay() + "/" + today.getMonth() + "/" + today.getFullYear()}</div>
        <Line options={options} data={data} />
      </div>
    )
}
export default DailyWastageComponent;
