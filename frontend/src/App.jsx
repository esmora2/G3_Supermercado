import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SaleForm from './components/SaleForm';
import ProductList from './components/ProductList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SaleForm />} />
        <Route path="/products" element={<ProductList />} />
      </Routes>
    </Router>
  );
}

export default App;
