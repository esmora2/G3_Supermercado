// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // Cambia según el puerto de tu backend de ventas
});

export default api;
