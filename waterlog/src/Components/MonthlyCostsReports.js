import React from 'react'
import { Bar, defaults } from 'react-chartjs-2';

const MonthlyCostsReports = (props) => {
    if (props.props.dataPoints) {
        var dataY = props.props.dataPoints.map(a => a.y);
        var data = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'Rands',
                    data: dataY,
                    fill: true,
                    borderColor: 'red',
                    backgroundColor: 'rgba(255,0,0,0.4)'
                }
            ]
        }
        var options = {
            maintainAspectRatio: true,
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Months'
                    },
                    ticks: {
                        major: {
                            fontStyle: 'bold',
                            fontColor: 'rgba(255,0,0,0)'
                        }
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Rands'
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
