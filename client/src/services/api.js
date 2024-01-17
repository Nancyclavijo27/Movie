// src/services/api.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001', // Ajusta la URL según la configuración de tu backend
});

export default instance;
