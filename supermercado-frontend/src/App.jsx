import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClientForm from './components/ClientForm';
import ProductForm from './components/ProductForm';
import SalesForm from './components/SalesForm';
import ProductList from './components/ProductList';
import Header from './components/Header';
import Sidebar from './components/Sidebar'; // Importa el Sidebar
import './App.css'; // Importa el CSS para aplicar estilos

const App = () => {
  return (
    <Router>
      <Header />
      <Sidebar /> {/* Agrega el Sidebar debajo del Header */}
      <div className="content-container">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/register-client" element={<ClientForm />} />
          <Route path="/register-product" element={<ProductForm />} />
          <Route path="/register-sale" element={<SalesForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
