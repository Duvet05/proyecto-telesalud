import React, { useState } from "react";
import "./NewAttentionPage.css";

const Appointments = () => {
  const PAGES = [
    "Información del paciente",
    "Seleccionar médico",
    "Mandar a triaje",
    "Visualizar Atención",
  ];

  const [currentPage, setCurrentPage] = useState(0);

  const navigate = (delta) => {
    setCurrentPage((prevPage) =>
      Math.min(Math.max(prevPage + delta, 0), PAGES.length - 1)
    );
  };

  return (
    <div className="contenedor-nueva-atencion">
      <h2 className="titulo">Nueva Atención</h2>
      <hr />

      <form>
        <div className={`contenedor-pagina-${currentPage + 1}`}>
          <h3>{PAGES[currentPage]}</h3>
          {currentPage === 0 && <PatientInfo navigate={navigate} />}
          {currentPage >= 1 && (
            <GenericPage
              label="Correo electrónico"
              type="email"
              id="correo"
              name="correo"
            />
          )}
          <NavigationButtons
            currentPage={currentPage}
            totalPages={PAGES.length}
            navigate={navigate}
          />
        </div>
      </form>
    </div>
  );
};

const PatientInfo = ({ navigate }) => {
  return (
    <div className="contenedor-pagina-1">
      {/* ... resto del código ... */}
      <div className="botones-navegacion">
        <button
          className="boton-navegacion"
          type="button"
          onClick={() => navigate(1)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

const GenericPage = ({ label, type, id, name }) => {
  return (
    <div>
      <label htmlFor={id}>{label}:</label>
      <input type={type} id={id} name={name} required />
    </div>
  );
};

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

export default Appointments;