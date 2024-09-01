import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../ProductList.css';
import SalesList from './SalesList'; // Importa el componente SalesList
import { FaSearch } from 'react-icons/fa'; // Importa el ícono de lupa

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editProductId, setEditProductId] = useState(null); // Usa id_product en lugar de índice
  const [editData, setEditData] = useState({ description: '', price: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [searchColumn, setSearchColumn] = useState('');
  const [searchVisible, setSearchVisible] = useState({
    id_product: false,
    description: false
  });

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

  const handleEdit = (productId) => {
    const product = products.find(p => p.id_product === productId);
    setEditProductId(productId);
    setEditData({
      description: product.description,
      price: product.price,
    });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:3002/products/${editProductId}`, {
        description: editData.description,
        price: editData.price,
      });
      setProducts(products.map((product) =>
        product.id_product === editProductId ? { ...product, ...editData } : product
      ));
      setEditProductId(null);
    } catch (error) {
      console.error('Error al actualizar el producto', error);
    }
  };

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearchIconClick = (column) => {
    setSearchColumn(column);
    setSearchVisible(prevState => ({
      ...prevState,
      [column]: !prevState[column] // Alterna la visibilidad
    }));
    setSearchTerm(''); // Limpiar el término de búsqueda al cambiar de columna
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter(product => {
    if (!searchTerm) return true;
    if (searchColumn === 'id_product') {
      return product.id_product.toString().includes(searchTerm);
    }
    if (searchColumn === 'description') {
      return product.description.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return false;
  });

  return (
    <div className="product-list-container">
      <div className="product-table-container">
        <h2>Lista de Productos</h2>
        <table className="product-table">
          <thead>
            <tr>
              <th>
                ID
                <FaSearch onClick={() => handleSearchIconClick('id_product')} className="search-icon" />
              </th>
              <th>
                Nombre
                <FaSearch onClick={() => handleSearchIconClick('description')} className="search-icon" />
              </th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
            {searchVisible.id_product && searchColumn === 'id_product' && (
              <tr>
                <th>
                  <input
                    type="text"
                    placeholder="Buscar por ID"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            )}
            {searchVisible.description && searchColumn === 'description' && (
              <tr>
                <th></th>
                <th>
                  <input
                    type="text"
                    placeholder="Buscar por Nombre"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            )}
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id_product}>
                <td>{product.id_product}</td>
                <td>
                  {editProductId === product.id_product ? (
                    <input
                      type="text"
                      name="description"
                      value={editData.description}
                      onChange={handleChange}
                    />
                  ) : (
                    product.description
                  )}
                </td>
                <td>
                  {editProductId === product.id_product ? (
                    <input
                      type="number"
                      name="price"
                      value={editData.price}
                      onChange={handleChange}
                    />
                  ) : (
                    `$${product.price}`
                  )}
                </td>
                <td>{product.stock}</td>
                <td>
                  {editProductId === product.id_product ? (
                    <button onClick={handleSave}>Guardar</button>
                  ) : (
                    <button onClick={() => handleEdit(product.id_product)}>Editar</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="sales-table-container">
        <SalesList />
      </div>
    </div>
  );
};

export default ProductList;
