import React from 'react';
import { CollectionFill } from 'react-bootstrap-icons';

const ProductosADM = () => {
  return (
    <div className="container">
        <div className="title-container">
            <div className='Symbol'> <CollectionFill size={40} /> </div>
            <div className='Title'>Productos</div>

            {/* Se deja sin usar el boton de back para usarlo en detalles */}
            <button className='back-button' saria-label="Volver atrás"></button>
        </div>
        <div className="container2">
            
        </div>
    </div>
  );
};

export default ProductosADM;