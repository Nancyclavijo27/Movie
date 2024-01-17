const path = require('path');

module.exports = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Nombre de tu API',
      version: '1.0.0',
      description: 'Descripción de tu API',
    },
    servers: [
      {
        url: 'http://localhost:3001', // Cambia esto según tu configuración
      },
    ],
  },
  apis: [path.resolve(__dirname, '../routes/*.js')], // Ajusta la ruta según tu estructura de carpetas
};
