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
          label: 'current cost',
          data: dataY,
          fill: true, 
          backgroundColor: '#56ccf7'
        },
        {
          label: 'forecast cost',
          data: forecast,
          fill: true, 
          backgroundColor: '#778899'
        }
      ]
    }
    var options = {
      legend: {
        display: true,
        position:'bottom',
        labels: {
            fontColor: '#C8C8C8', 
        }
       },
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
