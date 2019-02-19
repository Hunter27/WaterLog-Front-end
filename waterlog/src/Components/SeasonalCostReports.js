import React from 'react';
import { Bar, defaults } from 'react-chartjs-2';

const SeasonalCostReports = (props) => {
    console.log(props);
    var dataSummer = props.props.dataPoints[0].y;
    var dataWinter = props.props.dataPoints[1].y;
    var dataSpring = props.props.dataPoints[2].y;
    var dataAutumn = props.props.dataPoints[3].y;

    var data = {
        labels: ['Summer', 'Winter', 'Autumn', 'Spring'],
        datasets: [
            {
                label: 'Rands',
                data: [dataSummer, dataWinter, dataAutumn, dataSpring],
                fill: true,
                borderColor: 'red',
                backgroundColor: 'rgba(255,0,0,0.4)'
            }
        ]
    }
    var options = {
        scales: {
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Seasons'
                },
                ticks: {
                    major: {
                        fontStyle: 'bold',
                        fontColor: '#FF0000'
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
export default SeasonalCostReports;