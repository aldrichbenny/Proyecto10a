import React from 'react';
import { FileEarmarkRuledFill } from 'react-bootstrap-icons';

const SolicitudesADM = () => {
  return (
    <div className="container">
        <div className="title-container">
            <div className='Symbol'> <FileEarmarkRuledFill size={40} /> </div>
            <div className='Title'>Solicitudes</div>

            {/* Se deja sin usar el boton de back para usarlo en detalles */}
            <button className='back-button' saria-label="Volver atrás"></button>
        </div>
        <div className="container2">
            
        </div>
    </div>
  );
};

export default SolicitudesADM;