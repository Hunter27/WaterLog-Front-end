import React from 'react';
import { Bar, defaults } from 'react-chartjs-2';

const SeasonalUsageComponent = (props) => {
  var dataSummer = props.props[0].dataPoints.map(a => Math.round(a.y));
  var dataWinter = props.props[1].dataPoints.map(a => Math.round(a.y));
  var dataSpring = props.props[2].dataPoints.map(a => Math.round(a.y));
  var dataAutumn = props.props[3].dataPoints.map(a => Math.round(a.y));

  var data = {
    labels: ['Summer','Winter','Autumn','Spring'],
    datasets: [
      {
        label: 'liters',
        data: [dataSummer,dataWinter,dataAutumn,dataSpring],
        fill: true,         
        borderColor: 'red',
        backgroundColor: 'rgb(86, 204, 247)'
      }
    ]
  }
  var options = {
    scales: {
      xAxes: [ {
        scaleLabel: {
          display: true,
          labelString: 'seasons',
          fontColor:'rgb(236, 239, 241)'
        },
        ticks: {
          fontColor: 'rgb(236, 239, 241)',
          major: {
            fontStyle: 'bold',
            Color:'rgb(236, 239, 241)',
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
          fontColor: 'rgb(236, 239, 241)',
          major: {
            fontStyle: 'bold',
            Color:'rgb(236, 239, 241)',
          }
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
        <Bar options={options} data={data} />
      </div>
    )
}
export default SeasonalUsageComponent;
