import React from 'react';
import { ExclamationTriangleFill } from 'react-bootstrap-icons';
import '../css/error.css';

const Error = () => {
  return (
    <div id="error-container">
        <div id="error-title-container">
            <div id="error-symbol"> <ExclamationTriangleFill size={40} /> </div>
            <div id="error-title">Error 404</div>
        </div>
      <div id="error-content-container">
            <h1 id="error-main-message">Pagina no encontrada</h1>
            <h3 id="error-secondary-message">Intente establecer una comunicacion a internet</h3>
      </div>
    </div>
  );
};

export default Error;