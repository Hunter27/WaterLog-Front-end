import React from 'react'
import { Bar, defaults } from 'react-chartjs-2';

const MonthlyCostsReports = (props) => {
  if (props.props.monthlyCost.dataPoints) {
    var dataY = props.props.monthlyCost.dataPoints.map(a => Math.round(a.y));
    const forecast = props.props.forecastMonthly;
    var data = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'rands',
          data: dataY,
          fill: true,
          borderColor: 'rgb(86, 204, 247)',
          backgroundColor: 'rgb(86, 204, 247)'
        },
        {
          label: 'forecast',
          data: forecast,
          fill: true,
          borderColor: 'rgba(0,191,255,1)',
          backgroundColor: 'rgba(0,191,255,1)'
        }
      ]
    }
    var options = {
      maintainAspectRatio: true,
      scales: {
        xAxes: [{
          stacked: true,
          scaleLabel: {
            display: true,
            labelString: 'months',
            fontColor:'rgb(236, 239, 241)'
          },
          ticks: {
            fontColor:'rgb(236, 239, 241)',
            major: {
              fontStyle: 'bold',
              fontColor: 'rgba(255,0,0,1)'
            }
          },
          gridLines: {
            display: false,
            color:'rgb(236, 239, 241)'
          }
        }],
        yAxes: [{
          stacked: true,
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'rands',
            fontColor:'rgb(236, 239, 241)',
          },
          ticks: {
            fontColor:'rgb(236, 239, 241)'
          },
          gridLines: {
            display: false,
            color:'rgb(236, 239, 241)'
          }
        }]
      }

    }
    defaults.global.legend.display = false;
    return (
      <div className="cost-graph">
        <Bar options={options} data={data} />
      </div>
    )
  }
}
export default MonthlyCostsReports;
