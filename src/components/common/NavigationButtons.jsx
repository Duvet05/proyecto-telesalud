import React from 'react';

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
      {currentPage < totalPages - 1 ? (
        <button
          className="boton-navegacion"
          type="button"
          onClick={() => navigate(1)}
        >
          Siguiente
        </button>
      ) : (
        <button className="boton-navegacion" type="submit">
          Enviar
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;
