import React from 'react';
import { Bar, defaults } from 'react-chartjs-2'; 

const MonthlyUsageComponent = (props) => {
  if(props.props.dataPoints){
  var dataY = props.props.dataPoints.map(a => a.y); 
  var data = {
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    datasets: [
      {
        label: 'liters',
        data: dataY,
        fill: true,         
        borderColor: 'red'  ,
        backgroundColor: 'rgba(255,0,0,0.4)'
      }
    ]
  }
  var options = {
    maintainAspectRatio: true,
    scales: {
      xAxes: [ {
        scaleLabel: {
          display: true,
          labelString: 'months'
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
          labelString: 'liters'
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