import React from 'react';
import { Bar, defaults } from 'react-chartjs-2'; 

const MonthlyUsageComponent = (props) => {
  if(props.props.dataPoints){
  var dataY = props.props.dataPoints.map(a => Math.round(a.y)); 
  var data = {
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    datasets: [
      {
        label: 'liters',
        data: dataY,
        fill: true,         
        borderColor: 'red'  ,
        backgroundColor: 'rgb(86, 204, 247)'
      }
    ]
  }
  var options = {
    maintainAspectRatio: true,
    scales: {
      xAxes: [ {
        scaleLabel: {
          display: true,
          labelString: 'months',
          fontColor:'rgb(236, 239, 241)'
        },
        ticks: {
          fontColor:'rgb(236, 239, 241)',
          major: {
            fontStyle: 'bold',
            fontColor: 'rgb(86, 204, 247)'
          }
        },
        gridLines: {
          display: false,
          color : 'rgb(236, 239, 241)'
        }
      } ],
      yAxes: [ {
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'liters',
          fontColor:'rgb(236, 239, 241)'
        },
        ticks: {
          fontColor:'rgb(236, 239, 241)'
        },
        gridLines: {
          display: false,
          color : 'rgb(236, 239, 241)'
        }
      } ]
    }

  }
    defaults.global.legend.display = false;
    return (
      <div className="wastage-graph"> 
        <Bar options={options} data={ data } />
      </div>
    )
  }
}
export default MonthlyUsageComponent;
