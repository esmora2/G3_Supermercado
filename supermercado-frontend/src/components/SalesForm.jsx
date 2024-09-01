import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SalesForm = () => {
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [sale, setSale] = useState({
    idClient: '',
    date: '',
    details: []
  });
  const [newDetail, setNewDetail] = useState({
    idProduct: '',
    quantity: '',
    price: ''
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const clientsResponse = await axios.get('http://localhost:3003/clients');
        setClients(clientsResponse.data);
        const productsResponse = await axios.get('http://localhost:3002/products');
        setProducts(productsResponse.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const handleSaleChange = (e) => {
    setSale({
      ...sale,
      [e.target.name]: e.target.value
    });
  };

  const handleDetailChange = (e) => {
    setNewDetail({
      ...newDetail,
      [e.target.name]: e.target.value
    });
  };

  const addDetail = () => {
    setSale({
      ...sale,
      details: [...sale.details, newDetail]
    });
    setNewDetail({
      idProduct: '',
      quantity: '',
      price: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/sales', sale);
      alert('Venta registrada');
    } catch (error) {
      console.error(error);
      alert('Error al registrar venta');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrar Venta</h2>
      <select name="idClient" onChange={handleSaleChange}>
        <option value="">Seleccionar Cliente</option>
        {clients.map(client => (
          <option key={client.id_client} value={client.id_client}>
            {client.first_name} {client.last_name}
          </option>
        ))}
      </select>
      <input type="date" name="date" onChange={handleSaleChange} />
      <h3>Detalles de la Venta</h3>
      <select name="idProduct" onChange={handleDetailChange}>
        <option value="">Seleccionar Producto</option>
        {products.map(product => (
          <option key={product.id_product} value={product.id_product}>
            {product.description}
          </option>
        ))}
      </select>
      <input type="number" name="quantity" placeholder="Cantidad" onChange={handleDetailChange} />
      <input type="number" name="price" placeholder="Precio" step="0.01" onChange={handleDetailChange} />
      <button type="button" onClick={addDetail}>Agregar Detalle</button>
      <ul>
        {sale.details.map((detail, index) => (
          <li key={index}>
            Producto ID: {detail.idProduct}, Cantidad: {detail.quantity}, Precio: {detail.price}
          </li>
        ))}
      </ul>
      <button type="submit">Registrar Venta</button>
    </form>
  );
};

export default SalesForm;
