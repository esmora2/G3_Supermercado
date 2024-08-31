import React, { useState, useEffect } from 'react';
import api from '../api';

const SaleForm = () => {
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchClients = async () => {
      const response = await api.get('/clients');
      setClients(response.data);
    };

    const fetchProducts = async () => {
      const response = await api.get('/products');
      setProducts(response.data);
    };

    fetchClients();
    fetchProducts();
  }, []);

  const handleAddProduct = (product, quantity) => {
    setSelectedProducts([...selectedProducts, { ...product, quantity }]);
    setTotal(total + product.price * quantity);
  };

  const handleSubmit = async () => {
    const saleDetails = selectedProducts.map(p => ({
      idProduct: p.id_product,
      quantity: p.quantity,
      price: p.price,
    }));

    await api.post('/sales', {
      idClient: selectedClient,
      date: new Date().toISOString(),
      details: saleDetails,
    });

    // Clear form and update state
    setSelectedProducts([]);
    setTotal(0);
  };

  return (
    <section>
      <h1>Registrar Venta</h1>
      <section>
        <label>Cliente:</label>
        <select onChange={(e) => setSelectedClient(e.target.value)} value={selectedClient}>
          <option value="">Selecciona un cliente</option>
          {clients.map(client => (
            <option key={client.id_client} value={client.id_client}>
              {client.first_name} {client.last_name}
            </option>
          ))}
        </select>
      </section>
      <section>
        <h2>Productos</h2>
        {products.map(product => (
          <section key={product.id_product}>
            <span>{product.description} - ${product.price}</span>
            <button onClick={() => handleAddProduct(product, 1)}>Añadir 1</button>
          </section>
        ))}
      </section>
      <section>
        <h2>Productos Seleccionados</h2>
        {selectedProducts.map((product, index) => (
          <section key={index}>
            <span>{product.description} - Cantidad: {product.quantity} - Precio: ${product.price}</span>
          </section>
        ))}
        <h3>Total: ${total}</h3>
      </section>
      <button onClick={handleSubmit}>Registrar Venta</button>
    </section>
  );
};

export default SaleForm;
