import React from 'react';
import { Bar, defaults } from 'react-chartjs-2';

const SeasonalCostReports = (props) => {  
    var dataSummer = Math.round(props.props.dataPoints[0].y);
    var dataWinter = Math.round(props.props.dataPoints[1].y);
    var dataSpring = Math.round(props.props.dataPoints[2].y);
    var dataAutumn = Math.round(props.props.dataPoints[3].y);


    var data = {
        labels: ['Summer', 'Winter', 'Autumn', 'Spring'],
        datasets: [
            {
                label: 'rands',
                data: [dataSummer, dataWinter, dataAutumn, dataSpring],
                fill: true,
                borderColor: 'rgb(86, 204, 247)',
                backgroundColor: 'rgb(86, 204, 247)'
            }
        ]
    }
    var options = {
        scales: {
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'seasons',
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
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'rands',
                    fontColor:'rgb(236, 239, 241)'
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
export default SeasonalCostReports;
