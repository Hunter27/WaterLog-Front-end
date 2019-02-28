import React from 'react';
import { Bar, defaults } from 'react-chartjs-2';
import { Globals } from './../Globals';

const MonthlyWastageComponent = (props) => {
  if(props.props.dataPoints){
  var dataY = props.props.dataPoints.map(a => Math.round(a.y));
  var sum = dataY.reduce((a, b) => a + b, 0);
  var data = {
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    datasets: [
      {
        label: 'Liters',
        data: dataY,
        fill: true,         
        borderColor: 'red'  ,
        backgroundColor: '#56ccf7'
      }
    ]
  }
  var options = {
    maintainAspectRatio: true,
    scales: {
      xAxes: [ {
        scaleLabel: {
          display: true,
          labelString: 'Months',
          fontColor:'#eceff1'
        },
        ticks: {
          fontColor: '#eceff1',
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
          labelString: 'Liters',
          fontColor:'#eceff1'
        },
        ticks: {
          fontColor: '#eceff1'
        },
        gridLines: {
          display: false,
          color : '#eceff1'
        }
      } ]
    }

  }
    defaults.global.legend.display = false;
    return (
      <div className="wastage-graph">
      <div className="head"><b>R {(Math.round(sum*Globals.WATER_COST))}</b><b className="dailysubhead"> lost so far</b></div>
        <Bar options={options} data={ data } />
      </div>
    )
  }
}
export default MonthlyWastageComponent;
