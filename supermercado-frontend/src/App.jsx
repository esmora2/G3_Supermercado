import React from 'react';
import ClientForm from './components/ClientForm';
import ProductForm from './components/ProductForm';
import SalesForm from './components/SalesForm';
import ProductList from './components/ProductList';

const App = () => {
  return (
    <div>
      <h1>Supermercado Antojitos</h1>
      <ClientForm />
      <ProductForm />
      <SalesForm />
      <ProductList />
    </div>
  );
};

export default App;
