import React, { useEffect, useState } from 'react';
import api from '../api';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await api.get('/products');
      setProducts(response.data);
    };

    fetchProducts();
  }, []);

  return (
    <section>
      <h1>Productos</h1>
      <ul>
        {products.map(product => (
          <li key={product.id_product}>
            {product.description} - ${product.price} - Stock: {product.stock}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProductList;
