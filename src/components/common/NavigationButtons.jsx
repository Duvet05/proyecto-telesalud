import React from 'react';
import './NavigationButtons.css';

const NavigationButtons = ({ currentPage, totalPages, navigate }) => {
  return (
    <div className="botones-navegacion">
      {currentPage > 0 && (
        <button
          className="boton-navegacion"
          type="button"
          onClick={() => navigate(-1)}
        >
          Anterior
        </button>
      )}

      <button
        className="boton-navegacion"
        type={currentPage < totalPages - 1 ? "button" : "submit"}
        onClick={() => currentPage < totalPages - 1 && navigate(1)}
      >
        {currentPage < totalPages - 1 ? "Siguiente" : "Enviar"}
      </button>
    </div>
  );
};

export default NavigationButtons;
