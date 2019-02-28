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
        backgroundColor: '#56ccf7'
      }
    ]
  }
  var options = {
    scales: {
      xAxes: [ {
        scaleLabel: {
          display: true,
          labelString: 'seasons',
          fontColor:'#eceff1'
        },
        ticks: {
          fontColor: '#eceff1',
          major: {
            fontStyle: 'bold',
            Color:'#eceff1',
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
          fontColor: '#eceff1',
          major: {
            fontStyle: 'bold',
            Color:'#eceff1',
          }
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
        <Bar options={options} data={data} />
      </div>
    )
}
export default SeasonalUsageComponent;
