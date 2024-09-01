import React from 'react';
import { Link } from 'react-router-dom';
import '../Sidebar.css'; // Importa los estilos del Sidebar

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <ul>
        <li>
          <Link to="/">Lista de Productos</Link>
        </li>
        <li>
          <Link to="/register-client">Registrar Cliente</Link>
        </li>
        <li>
          <Link to="/register-product">Registrar Producto</Link>
        </li>
        <li>
          <Link to="/register-sale">Registrar Venta</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
