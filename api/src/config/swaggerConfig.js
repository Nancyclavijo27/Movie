const swaggerJsdoc = require('swagger-jsdoc');

// Configuración para Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Películas', // Ajusta según el nombre de tu API
      version: '1.0.0',
      description: 'API para buscar y obtener detalles de películas.',
    },
    servers: [
      {
        url: 'http://localhost:3001', // Ajusta según tu configuración
      },
    ],
  },
  apis: ['./src/Routes/*.js'], // Ajusta según tu estructura de carpetas
};

// Generar el documento OpenAPI/Swagger
const openapiSpecification = swaggerJsdoc(options);

// Exportar el documento para su uso en otras partes de tu aplicación
module.exports = openapiSpecification;

