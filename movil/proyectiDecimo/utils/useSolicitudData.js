// utils/useSolicitudData.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const useSolicitudData = () => {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://172.18.2.162:8000/api/Solicitud/');
        const solicitudes = response.data;

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

        setAreas([
          { nombre: 'General', pendientes: count1, aceptadas: count2, terminadas: count3 },
          { nombre: 'Cutting', pendientes: count4, aceptadas: count5, terminadas: count6 },
          { nombre: 'Packaging', pendientes: count7, aceptadas: count8, terminadas: count9 },
        ]);
      } catch (error) {
        console.error('Error fetching solicitudes:', error);
      }
    };

    fetchData();
  }, []);

  return areas;
};

export default useSolicitudData;