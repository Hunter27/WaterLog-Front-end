import React from 'react';
import { Line, defaults } from 'react-chartjs-2';
import { Globals } from './../Globals';

const DailyWastageComponent = (props) => {
  let labels = props.props.dataPoints.map(a => (new Date(a.x).getHours()+":00"));
  let datas = props.props.dataPoints.map(a => a.y);
  var sum = datas.reduce((a, b) => a + b, 0);
  let today =  new Date(Date.now());
  var data = {
    labels: labels,
    datasets: [
      {
        label: 'Liters',
        data: datas,
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
