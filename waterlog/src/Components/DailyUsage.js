import React from 'react';
import { Line, defaults } from 'react-chartjs-2'; 

const DailyUsageComponent = (props) => {
  var labelX = props.props.dataPoints.map(a => (new Date(a.x).getHours()+":00"));
  var dataY = props.props.dataPoints.map(a => a.y); 
  var today =  new Date(Date.now());
  var data = {
    labels: labelX,
    datasets: [
      {
        label: 'liters',
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
          labelString: 'hours'
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
      <div className="date">{"Today is : " + today.getDay() + "/" + today.getMonth() + "/" + today.getFullYear()}</div>
        <Line options={options} data={data} />
      </div>
    )
}
export default DailyUsageComponent;
