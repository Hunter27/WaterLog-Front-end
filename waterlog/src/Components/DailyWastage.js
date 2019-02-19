import React from 'react';
import { Line, defaults } from 'react-chartjs-2';
import { Globals } from './../Globals';

const DailyWastageComponent = (props) => {
  var labelX = props.props.dataPoints.map(a => (new Date(a.x).getHours()+":00"));
  var dataY = props.props.dataPoints.map(a => Math.round(a.y));
  var sum = dataY.reduce((a, b) => a + b, 0);
  var today =  new Date(Date.now());
  var data = {
    labels: labelX,
    datasets: [
      {
        label: 'Liters',
        data: dataY,
        fill: true,         
        borderColor: 'rgb(255,23,68)',
        backgroundColor: 'rgba(	255, 23, 68,0.4)',
        pointBackgroundColor: 'rgb(255,23,68)',
        pointRadius: 5,
        pointHitRadius: 5,
        
      }
    ]
  }
  var options = {
    defaultFontFamily: "Roboto",
    scales: {
      xAxes: [ {
        scaleLabel: {
          display: true,
          labelString: 'Hours'
        },
        ticks: {
          major: {
            fontStyle: 'bold',
            fontColor: '#919191',
          }
        },
        gridLines: {
          display: false
        }
      } ],
      yAxes: [ {
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Liters'
        },
        gridLines: {
          display: false
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
