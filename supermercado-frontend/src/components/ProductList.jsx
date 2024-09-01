import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3002/products');
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Lista de Productos</h2>
      <ul>
        {products.map(product => (
          <li key={product.id_product}>
            {product.description} - Precio: ${product.price} - Stock: {product.stock}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
