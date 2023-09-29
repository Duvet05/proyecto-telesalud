import React, { useState } from "react";
import "./NewAttentionPage.css";
import PatientInfo from "../../components/patient/PatientInfo";
import NavigationButtons from "../../components/common/NavigationButtons";

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

const GenericPage = ({ label, type, id, name }) => {
  return (
    <div>
      <label htmlFor={id}>{label}:</label>
      <input type={type} id={id} name={name} required />
    </div>
  );
};

export default Appointments;
