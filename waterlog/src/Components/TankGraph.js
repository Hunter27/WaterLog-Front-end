import React from 'react';
import { Line, defaults } from 'react-chartjs-2';

const TankGraph = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'rands',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(255,0,0,0.4)',
        borderColor: 'rgba(255,0,0,0.4)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(255,0,0,0.4)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  };
  defaults.global.legend.display = false;
  return (
    <div className="tank-graph">
      <h3>Wastage History</h3>
      <Line data={data} />
    </div>
  )
}
export default TankGraph;

