import React from 'react';
import { Bar, defaults } from 'react-chartjs-2';

const SeasonalUsageComponent = (props) => {
  var dataSummer = props.props[0].dataPoints.map(a => a.y);
  var dataWinter = props.props[1].dataPoints.map(a => a.y);
  var dataSpring = props.props[2].dataPoints.map(a => a.y);
  var dataAutumn = props.props[3].dataPoints.map(a => a.y);

  var data = {
    labels: ['Summer','Winter','Autumn','Spring'],
    datasets: [
      {
        label: 'liters',
        data: [dataSummer,dataWinter,dataAutumn,dataSpring],
        fill: true,         
        borderColor: 'red',
        backgroundColor: 'rgba(255,0,0,5)'
      }
    ]
  }
  var options = {
    scales: {
      xAxes: [ {
        scaleLabel: {
          display: true,
          labelString: 'seasons'
        },
        ticks: {
          major: {
            fontStyle: 'bold',
            fontColor: '#FF0000'
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
          labelString: 'liters'
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
        <Bar options={options} data={data} />
      </div>
    )
}
export default SeasonalUsageComponent;
