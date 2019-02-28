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
          labelString: 'months',
          fontColor:'#eceff1'
        },
        ticks: {
          fontColor:'#eceff1',
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
          fontColor:'#eceff1'
        },
        ticks: {
          fontColor:'#eceff1'
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
        <Bar options={options} data={ data } />
      </div>
    )
  }
}
export default MonthlyUsageComponent;
