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
          borderColor: '#56ccf7',
          backgroundColor: '#56ccf7'
        },
        {
          label: 'forecast',
          data: forecast,
          fill: true,
          borderColor: '#eceff1',
          backgroundColor: '#eceff1'
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
            color:'#eceff1'
          }
        }],
        yAxes: [{
          stacked: true,
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'rands',
            fontColor:'#eceff1',
          },
          ticks: {
            fontColor:'#eceff1'
          },
          gridLines: {
            display: false,
            color:'#eceff1'
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
