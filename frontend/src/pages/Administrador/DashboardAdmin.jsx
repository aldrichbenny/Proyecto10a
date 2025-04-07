import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import '../../css/DashboardADM.css'
import { getSolicitud } from '../../api/pedidos';
import { Button, FormSelect } from 'react-bootstrap';
import { Clipboard2DataFill } from 'react-bootstrap-icons';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, BarElement } from 'chart.js';
ChartJS.register( CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend );

const DashboardAdmin = () => {
  const [chartData, setChartData] = useState(null);
  const [viewMode, setViewMode] = useState('daily');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const [GenRevisar, setGenRevisar] = useState(0);
  const [GenAprobar, setGenAprobar] = useState(0);
  const [GenTerminar, setGenTerminar] = useState(0);
  const [CortPend, setCortPend] = useState(0);
  const [CortAceptar, setCortAceptar] = useState(0);
  const [CortTerminar, setCortTerminar] = useState(0);
  const [EmbPend, setEmbPend] = useState(0);
  const [EmbAceptar, setEmbAceptar] = useState(0);
  const [EmbTerminar, setEmbTerminar] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSolicitud();
        const solicitudes = response.data;

        // NUMEROS
        let count1 = 0, count2 = 0, count3 = 0, count4 = 0, count5 = 0, count6 = 0, count7 = 0, count8 = 0, count9 = 0;

        solicitudes.forEach((solicitud) => {
          const estado = solicitud.estado_solicitud;
          
          if (estado === 'IN REVIEW') count1++;
          if (estado === 'CUT-OFF-PENDING') { count2++; count4++; }
          if (estado === 'CUT-OFF-ACCEPTED') { count2++; count5++; }
          if (estado === 'PACKAGING-PENDING') { count2++; count7++; count6++; }
          if (estado === 'PACKAGING-ACCEPTED') { count2++; count8++; count6++; }
          if (estado === 'SHIPPED') { count2++; count3++; count6++; count9++; }
        });

        setGenRevisar(count1);
        setGenAprobar(count2);
        setGenTerminar(count3);
        setCortPend(count4);
        setCortAceptar(count5);
        setCortTerminar(count6);
        setEmbPend(count7);
        setEmbAceptar(count8);
        setEmbTerminar(count9);

        // GRAFICA
        if (viewMode === 'daily') {
          const daysCount = {};
          
          solicitudes.forEach((solicitud) => {
            const fecha = new Date(solicitud.fecha_registro);
            const dateKey = fecha.toISOString().split('T')[0];
            
            if (!daysCount[dateKey]) {
              daysCount[dateKey] = 0;
            }
            daysCount[dateKey]++;
          });

          const sortedDates = Object.keys(daysCount).sort();
          const sortedData = sortedDates.map(date => daysCount[date]);

          setChartData({
            labels: sortedDates,
            datasets: [
              {
                label: 'Solicitudes por día',
                data: sortedData,
                fill: false,
                backgroundColor: '#b04a4a',
                tension: 0.1,
              },
            ],
          });
        } else {
          const monthsCount = Array(12).fill(0);
          const monthNames = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
          ];
          
          solicitudes.forEach((solicitud) => {
            const fecha = new Date(solicitud.fecha_registro);
            const month = fecha.getMonth();
            const year = fecha.getFullYear();
            
            if (year === selectedYear) {
              monthsCount[month]++;
            }
          });

          setChartData({
            labels: monthNames,
            datasets: [
              {
                label: `Solicitudes en ${selectedYear}`,
                data: monthsCount,
                fill: false,
                backgroundColor: '#b04a4a',
                tension: 0.1,
              },
            ],
          });
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, [viewMode, selectedYear]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: viewMode === 'daily' 
          ? 'Solicitudes por día' 
          : `Solicitudes por mes (${selectedYear})`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  return (
    <div className="container">
      <div className="title-container">
        <div className='Symbol'> <Clipboard2DataFill size={40} /> </div>
        <div className='Title'>Dashboard</div>
        <button className='back-button' aria-label="Volver atrás"></button>
      </div>
      
      <div className="container2">
        {/* Tabla de estadísticas */}
        <div className="estadisticas-container-admin">
          <div className="estadisticas-tabla-admin">
            {/* Encabezados de columnas */}
            <div className="tabla-header-admin">
              <div className="tabla-celda-admin header-area-admin">Área</div>
              <div className="tabla-celda-admin">Por revisar/Pendientes</div>
              <div className="tabla-celda-admin">Aceptadas</div>
              <div className="tabla-celda-admin">Terminadas</div>
            </div>
            
            {/* Fila General */}
            <div className="tabla-fila-admin">
              <div className="tabla-celda-admin header-area-admin">General</div>
              <div className="tabla-celda-admin">
                <div className="valor-admin">{GenRevisar}</div>
                <div className="barra-container-admin">
                  <div 
                    className="barra-progreso-admin" 
                    style={{ width: `${(GenRevisar / Math.max(1, GenRevisar + GenAprobar + GenTerminar)) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="tabla-celda-admin">
                <div className="valor-admin">{GenAprobar}</div>
                <div className="barra-container-admin">
                  <div 
                    className="barra-progreso-admin" 
                    style={{ width: `${(GenAprobar / Math.max(1, GenRevisar + GenAprobar + GenTerminar)) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="tabla-celda-admin">
                <div className="valor-admin">{GenTerminar}</div>
                <div className="barra-container-admin">
                  <div 
                    className="barra-progreso-admin" 
                    style={{ width: `${(GenTerminar / Math.max(1, GenRevisar + GenAprobar + GenTerminar)) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            {/* Fila Corte */}
            <div className="tabla-fila-admin">
              <div className="tabla-celda-admin header-area-admin">Corte</div>
              <div className="tabla-celda-admin">
                <div className="valor-admin">{CortPend}</div>
                <div className="barra-container-admin">
                  <div 
                    className="barra-progreso-admin" 
                    style={{ width: `${(CortPend / Math.max(1, CortPend + CortAceptar + CortTerminar)) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="tabla-celda-admin">
                <div className="valor-admin">{CortAceptar}</div>
                <div className="barra-container-admin">
                  <div 
                    className="barra-progreso-admin" 
                    style={{ width: `${(CortAceptar / Math.max(1, CortPend + CortAceptar + CortTerminar)) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="tabla-celda-admin">
                <div className="valor-admin">{CortTerminar}</div>
                <div className="barra-container-admin">
                  <div 
                    className="barra-progreso-admin" 
                    style={{ width: `${(CortTerminar / Math.max(1, CortPend + CortAceptar + CortTerminar)) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            {/* Fila Embalaje */}
            <div className="tabla-fila-admin">
              <div className="tabla-celda-admin header-area-admin">Embalaje</div>
              <div className="tabla-celda-admin">
                <div className="valor-admin">{EmbPend}</div>
                <div className="barra-container-admin">
                  <div 
                    className="barra-progreso-admin" 
                    style={{ width: `${(EmbPend / Math.max(1, EmbPend + EmbAceptar + EmbTerminar)) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="tabla-celda-admin">
                <div className="valor-admin">{EmbAceptar}</div>
                <div className="barra-container-admin">
                  <div 
                    className="barra-progreso-admin" 
                    style={{ width: `${(EmbAceptar / Math.max(1, EmbPend + EmbAceptar + EmbTerminar)) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="tabla-celda-admin">
                <div className="valor-admin">{EmbTerminar}</div>
                <div className="barra-container-admin">
                  <div 
                    className="barra-progreso-admin" 
                    style={{ width: `${(EmbTerminar / Math.max(1, EmbPend + EmbAceptar + EmbTerminar)) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controles para cambiar la vista */}
        <div className="chart-controls mt-5">
          <Button onClick={() => handleViewModeChange('daily')} className={viewMode === 'daily' ? 'active' : ''}>
            Vista por día
          </Button>
          <Button onClick={() => handleViewModeChange('monthly')} className={viewMode === 'monthly' ? 'active' : ''}>
            Vista por mes
          </Button>

          {viewMode === 'monthly' && (
            <FormSelect value={selectedYear} onChange={handleYearChange} className='mt-3'>
              {[2022, 2023, 2024, 2025].map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </FormSelect>
          )}
        </div>

        {/* GRAFICA DE SOLICITUDES */}
        <div className="bg-white mt-4">
          <div className="border rounded-lg p-4">
            {chartData ? <Bar data={chartData} options={options} /> : <p>Cargando datos...</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;