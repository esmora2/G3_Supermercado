import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = () => {
  const [product, setProduct] = useState({
    description: '',
    price: '',
    stock: ''
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3002/products', product);
      alert('Producto registrado');
    } catch (error) {
      console.error(error);
      alert('Error al registrar producto');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrar Producto</h2>
      <input type="text" name="description" placeholder="Descripción" onChange={handleChange} />
      <input type="number" name="price" placeholder="Precio" step="0.01" onChange={handleChange} />
      <input type="number" name="stock" placeholder="Stock" onChange={handleChange} />
      <button type="submit">Registrar</button>
    </form>
  );
};

export default ProductForm;
