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
      },
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
    <div className="p-4">
      <h1 className="text-2xl font-bold p-4 bg-[#cd5c5c] text-white rounded mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="border rounded-lg p-4 flex items-center justify-between">
          <div>
            <h3 className="text-gray-600">Solicitudes aprobadas</h3>
            <p className="text-3xl font-bold">9</p>
          </div>
          <div className="text-4xl text-gray-400">
            <i className="fas fa-file-alt"></i>
          </div>
        </div>

        <div className="border rounded-lg p-4 flex items-center justify-between">
          <div>
            <h3 className="text-gray-600">Solicitudes pendientes</h3>
            <p className="text-3xl font-bold">2</p>
          </div>
          <div className="text-4xl text-gray-400">
            <i className="fas fa-file-alt"></i>
          </div>
        </div>

        <div className="border rounded-lg p-4 flex items-center justify-between">
          <div>
            <h3 className="text-gray-600">Solicitudes terminadas</h3>
            <p className="text-3xl font-bold">21</p>
          </div>
          <div className="text-4xl text-gray-400">
            <i className="fas fa-file-alt"></i>
          </div>
        </div>
      </div>

      <div className="border rounded-lg p-4">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default DashboardAdmin;
