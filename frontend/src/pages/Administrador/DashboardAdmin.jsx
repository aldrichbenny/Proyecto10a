import React from 'react';
import { Line } from 'react-chartjs-2';
import '../../css/DashboardADM.css'
import { Clipboard2DataFill } from 'react-bootstrap-icons';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend );

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
    <div className="container">
        <div className="title-container">
            <div className='Symbol'> <Clipboard2DataFill size={40} /> </div>
            <div className='Title'>Dashboard</div>
            {/* Se deja sin usar el boton de back para usarlo en detalles */}
            <button className='back-button' saria-label="Volver atrás"></button>
        </div>
      <div className="container2">
        <div className="estadisticas-container">
          {/* Sección de Generales */}
          <div className="seccion">
            <h3 className="titulo-seccion">Estadísticas generales</h3>
            <div className="cartas-columna">
              <div className="carta"><p>Solicitudes aprobadas</p><h2>12</h2></div>
              <div className="carta"><p>Solicitudes pendientes</p><h2>12</h2></div>
              <div className="carta"><p>Solicitudes terminadas</p><h2>12</h2></div>
            </div>
          </div>

          {/* Sección de Corte */}
          <div className="seccion">
            <h3 className="titulo-seccion">Área de corte</h3>
            <div className="cartas-columna">
              <div className="carta"><p>Solicitudes aprobadas</p><h2>12</h2></div>
              <div className="carta"><p>Solicitudes pendientes</p><h2>12</h2></div>
              <div className="carta"><p>Solicitudes terminadas</p><h2>12</h2></div>
            </div>
          </div>

          {/* Sección de Embalaje */}
          <div className="seccion">
            <h3 className="titulo-seccion">Área de embalaje</h3>
            <div className="cartas-columna">
              <div className="carta"><p>Solicitudes aprobadas</p><h2>12</h2></div>
              <div className="carta"><p>Solicitudes pendientes</p><h2>12</h2></div>
              <div className="carta"><p>Solicitudes terminadas</p><h2>12</h2></div>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="border rounded-lg p-4">
            <Line data={data} options={options} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardAdmin;
