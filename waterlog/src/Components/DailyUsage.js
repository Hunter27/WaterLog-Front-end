import React from 'react';
import { Line, defaults } from 'react-chartjs-2'; 

const DailyUsageComponent = (props) => {
  var labelX = props.props.dataPoints.map(a => (new Date(a.x).getHours()+":00"));
  var dataY = props.props.dataPoints.map(a => Math.round(a.y));  
  var data = {
    labels: labelX,
    datasets: [
      {
        label: 'liters',
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
    scales: {
      xAxes: [ {
        scaleLabel: {
          display: true,
          labelString: 'hours',
          fontColor : 'rgb(236, 239, 241)'
        },
        ticks: {
          fontColor : 'rgb(236, 239, 241)',
          major: {
            fontStyle: 'bold',
            fontColor: 'rgba(255,0,0,1)'
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
          fontColor : 'rgb(236, 239, 241)'
        },
        ticks: {
          fontColor : 'rgb(236, 239, 241)'
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
        <Line options={options} data={data} />
      </div>
    )
}
export default DailyUsageComponent;
