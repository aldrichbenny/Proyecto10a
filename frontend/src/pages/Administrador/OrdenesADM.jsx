import React from 'react';
import { InboxesFill } from 'react-bootstrap-icons';

const OrdenesADM= () => {
  return (
    <div className="container">
        <div className="title-container">
            <div className='Symbol'> <InboxesFill size={40} /> </div>
            <div className='Title'>Ordenes</div>

            {/* Se deja sin usar el boton de back para usarlo en detalles */}
            <button className='back-button' saria-label="Volver atrás"></button>
        </div>
        <div className="container2">
            
        </div>
    </div>
  );
};

export default OrdenesADM;