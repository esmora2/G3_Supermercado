import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../SalesList.css'; // Asegúrate de crear un archivo CSS para el estilo

const SalesList = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    async function fetchSales() {
      try {
        const response = await axios.get('http://localhost:3001/sales');
        setSales(response.data);
      } catch (error) {
        console.error('Error al obtener las ventas', error);
      }
    }
    fetchSales();
  }, []);

  return (
    <div>
      <h2>Últimas Ventas</h2>
      <table className="sales-table">
        <thead>
          <tr>
            <th>ID Cliente</th>
            <th>ID Producto</th>
            <th>Fecha Venta</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id_sale}>
              <td>{sale.id_client}</td>
              <td>{sale.id_product}</td>
              <td>{new Date(sale.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesList;
