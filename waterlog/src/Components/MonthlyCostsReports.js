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
          borderColor: 'rgba(255,0,0,0)',
          backgroundColor: 'rgba(255,0,0,1)'
        },
        {
          label: 'forecast',
          data: forecast,
          fill: true,
          borderColor: 'rgb(0,191,255)',
          backgroundColor: 'rgb(0,191,255)'
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
            labelString: 'months'
          },
          ticks: {
            major: {
              fontStyle: 'bold',
              fontColor: 'rgba(255,0,0,1)'
            }
          },
          gridLines: {
            display: false
          }
        }],
        yAxes: [{
          stacked: true,
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'rands'
          },
          gridLines: {
            display: false
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
