import React, { useState } from 'react';
import './MenuComponent.css';
import PatientsTable from './PatientsTable';

function MenuComponent() {
    const [isHidden, setIsHidden] = useState(false);

    return (
        <div className="container">
            <div className={`menu ${isHidden ? 'hidden' : ''}`}>
                <div className="user-info">
                    <img className="user-avatar" src="url_imagen_del_usuario" alt="User Avatar"/>
                    <h3>Nombres del Usuario</h3>
                    <h4>Especialidad</h4>
                    <p>correo@ejemplo.com</p>
                </div>
                <div className="modules">
                    <button>Módulo 1</button>
                    <button>Módulo 2</button>
                    <button>Módulo 3</button>
                </div>
            </div>
            <button onClick={() => setIsHidden(!isHidden)}>{isHidden ? 'Mostrar Menú' : 'Ocultar Menú'}</button>
        </div>
    );
}

export default MenuComponent;