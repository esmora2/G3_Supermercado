import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClientForm = () => {
  const [client, setClient] = useState({
    idType: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: ''
  });
  const [types, setTypes] = useState([]); // Estado para almacenar los tipos de ID

  // Función para obtener los tipos de ID desde el backend
  const fetchTypes = async () => {
    try {
      const response = await axios.get('http://localhost:3003/types'); // Asegúrate de que esta URL sea correcta
      setTypes(response.data);
    } catch (error) {
      console.error('Error al obtener los tipos:', error);
    }
  };

  useEffect(() => {
    fetchTypes(); // Cargar los tipos cuando el componente se monte
  }, []);

  const handleChange = (e) => {
    setClient({
      ...client,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3003/clients', client);
      alert('Cliente registrado');
    } catch (error) {
      console.error(error);
      alert('Error al registrar cliente');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrar Cliente</h2>
      <label>
        ID Tipo
        <select name="idType" value={client.idType} onChange={handleChange}>
          <option value="">Seleccione un tipo</option>
          {types.map((type) => (
            <option key={type.id_type} value={type.id_type}>
              {type.description}
            </option>
          ))}
        </select>
      </label>
      <input type="text" name="firstName" placeholder="Nombre" value={client.firstName} onChange={handleChange} />
      <input type="text" name="lastName" placeholder="Apellido" value={client.lastName} onChange={handleChange} />
      <input type="text" name="phone" placeholder="Teléfono" value={client.phone} onChange={handleChange} />
      <input type="text" name="address" placeholder="Dirección" value={client.address} onChange={handleChange} />
      <button type="submit">Registrar</button>
    </form>
  );
};

export default ClientForm;
