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
                borderColor: '#56ccf7',
                backgroundColor: '#56ccf7'
            }
        ]
    }
    var options = {
        scales: {
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'seasons',
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
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'rands',
                    fontColor:'#eceff1'
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
export default SeasonalCostReports;
