import React from 'react';
import { Line, defaults } from 'react-chartjs-2';
import {ForecastType} from './../actions/CostForecastActions';

const ForecastChartComponent = (props) => {
console.log(props.data)

  var y = props.data.y;
  var x = props.data.x;
  var _labels = []
  for(var i = 0; i < x.length; i = i + 1){
    _labels.push('');
  }

  var xLabel;
  if(props.data.type === ForecastType.DAILY){
    xLabel = 'Hours'
  } else if (props.data.type === ForecastType.MONTHLY){
    xLabel = 'Days'
  }

  var data = {
    labels: _labels,
    datasets: [
      {
        label: 'Cost',
        data: y,
        fill: true,         
        borderColor: 'blue'  
      }
    ]
  }
  var options = {
    maintainAspectRatio: true,
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Costs'
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: xLabel
        }
      }],
    }     
  }
    defaults.global.legend.display = false;
    return (
      <div className="wastage-graph">
        <Line options={options} data={data} />
      </div>
    )
}
export default ForecastChartComponent;
