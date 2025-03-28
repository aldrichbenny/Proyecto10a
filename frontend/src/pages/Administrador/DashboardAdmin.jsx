import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashboardAdmin = () => {
  const data = {
    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    datasets: [
      {
        label: 'Solicitudes de ordenes',
        data: [7.5, 6, 4, 6, 10, 4, 2.5],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        pointBackgroundColor: 'rgb(75, 192, 192)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Solicitudes de ordenes',
        align: 'start',
        font: {
          size: 14,
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `Ordenes: ${context.parsed.y}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
        ticks: {
          stepSize: 2.5,
        },
      },
    },
  };

  return (
    <div className="bg-white p-4">
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="border p-6 text-center">
          <h3 className="text-xl mb-3">Solicitudes aprobadas</h3>
          <span className="material-icons text-gray-800 text-3xl mb-3">description</span>
          <div className="text-4xl">9</div>
        </div>

        <div className="border p-6 text-center">
          <h3 className="text-xl mb-3">Solicitudes pendientes</h3>
          <span className="material-icons text-gray-800 text-3xl mb-3">description</span>
          <div className="text-4xl">2</div>
        </div>

        <div className="border p-6 text-center">
          <h3 className="text-xl mb-3">Solicitudes terminadas</h3>
          <span className="material-icons text-gray-800 text-3xl mb-3">description</span>
          <div className="text-4xl">21</div>
        </div>
      </div>
        
      <div className="border p-6 mt-4">
        <div className="mb-4">
          <h3 className="text-xl">Solicitudes de ordenes</h3>
        </div>
        <Line data={data} options={options} height={80} />
      </div>
    </div>
  );
};

export default DashboardAdmin;
