import React from 'react';
import { useState } from 'react';
import './NewAttentionPage.css'
type Props = {};

const Appointments = (props: Props) => {
  const [paginaActual, setPaginaActual] = useState(1);
  const avanzarPagina = () => {
    setPaginaActual(paginaActual + 1);
  };

  const retrocederPagina = () => {
    setPaginaActual(paginaActual - 1);
  };

  // Realizar otras acciones según sea necesario

  return (
    <div className="contenedor-nueva-atencion">
      <h2 className="titulo">Nueva Atención</h2>
      <hr />


      <form>
        {paginaActual === 1 && (
          <div className='contenedor-pagina-1'>
            <h3>Información del paciente</h3>
            <div className='contenedor-campos'>
              <div className="campo">
                <label htmlFor="numero-documento-paciente">N° documento</label>
                <input type="tel" className="input-oscuro" id="numero-documento-paciente" name="numero-documento-paciente" required readOnly/>
              </div>
              <div className="campo">
                <label htmlFor="codigo-asegurado-sis">Código del asegurado SIS</label>
                <input type="text" className="input-oscuro" id="codigo-asegurado-sis" name="codigo-asegurado-sis" required readOnly/>
              </div>
              <div className="campo">
                <label htmlFor="numero-historia-clinica">N° historia clínica</label>
                <input type="tel" className="input-oscuro" id="numero-historia-clinica" name="numero-historia-clinica" required readOnly/>
              </div>
              <div className="campo">
                <label htmlFor="apellido-paterno">Apellido paterno</label>
                <input type="text" className="input-oscuro" id="apellido-paterno" name="apellido-paterno" required readOnly/>
              </div>
              <div className="campo">
                <label htmlFor="apellido-materno">Apellido materno:</label>
                <input type="text" className="input-oscuro" id="apellido-materno" name="apellido-materno" required readOnly/>
              </div>
              <div className="campo">
                <label htmlFor="nombres">Nombres</label>
                <input type="text" className="input-oscuro" id="nombres" name="nombres" required readOnly/>
              </div>
              <div className="campo">
                <label htmlFor="numero-documento-acompanante">N° documento del acompañante</label>
                <input type="tel" id="numero-documento-acompanante" name="numero-documento-acompanante" required />
              </div>
              <div className="campo">
                <label htmlFor="nombre-acompanante">Nombre del acompañante</label>
                <input type="text" id="nombre-acompanante" name="nombre-acompanante" required />
              </div>
            </div>
            <div className='botones-navegacion'>
              <button className="boton-navegacion" type="button" onClick={avanzarPagina}>Siguiente</button>
            </div>
          </div>
        )}
        {paginaActual === 2 && (
          <div className='contenedor-pagina-2'>
            <h3>Seleccionar médico</h3>
            <div>
              <label htmlFor="correo">Correo electrónico:</label>
              <input type="email" id="correo" name="correo" required />
              <button type="button" onClick={retrocederPagina}>Anterior</button>
              <button type="button" onClick={avanzarPagina}>Siguiente</button>
            </div>
          </div>
        )}
        {paginaActual === 3 && (
          <div className='contenedor-pagina-2'>
            <h3>Mandar a triaje</h3>
            <div>
              <label htmlFor="correo">Correo electrónico:</label>
              <input type="email" id="correo" name="correo" required />
              <button type="button" onClick={retrocederPagina}>Anterior</button>
              <button type="button" onClick={avanzarPagina}>Siguiente</button>
            </div>
          </div>
        )}
        {paginaActual === 4 && (
          <div className='contenedor-pagina-2'>
            <h3>Visualizar Atención</h3>
            <div>
              <label htmlFor="correo">Correo electrónico:</label>
              <input type="email" id="correo" name="correo" required />
              <button type="button" onClick={retrocederPagina}>Anterior</button>
              <button type="submit">Enviar</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};


export default Appointments;