import React from 'react';
import { Bar, defaults } from 'react-chartjs-2';

const SeasonalCostReports = (props) => { 
    var dataSummer = props.props.dataPoints[0].y;
    var dataWinter = props.props.dataPoints[1].y;
    var dataSpring = props.props.dataPoints[2].y;
    var dataAutumn = props.props.dataPoints[3].y;

    var data = {
        labels: ['Summer', 'Winter', 'Autumn', 'Spring'],
        datasets: [
            {
                label: 'rands',
                data: [dataSummer, dataWinter, dataAutumn, dataSpring],
                fill: true,
                borderColor: 'rgba(255,0,0,0)',
                backgroundColor: 'rgba(255,0,0,0)'
            }
        ]
    }
    var options = {
        scales: {
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'seasons'
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
                    labelString: 'rands'
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
export default SeasonalCostReports;