import React from 'react';
import { PeopleFill } from 'react-bootstrap-icons';

const ClienteADM = () => {
  return (
    <div className="container">
        <div className="title-container">
            <div className='Symbol'> <PeopleFill size={40} /> </div>
            <div className='Title'>Clientes</div>

            {/* Se deja sin usar el boton de back para usarlo en detalles */}
            <button className='back-button' saria-label="Volver atrás"></button>
        </div>
        <div className="container2">
            
        </div>
    </div>
  );
};

export default ClienteADM;