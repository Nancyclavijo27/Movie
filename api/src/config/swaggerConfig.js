const path = require('path');

module.exports = {
  swaggerDefinition: {
    openapi: '3.0.0', // o '3.1.0'
    info: {
      title: 'API de Películas',
      version: '1.0.0',
      description: 'API para buscar y obtener detalles de películas.',
    },
    servers: [
      {
        url: 'http://localhost:3001', // Ajusta según tu configuración
      },
    ],
  },
  apis: [path.resolve(__dirname, '../Routes/*.js')], // Ajusta según tu estructura de carpetas
  paths: {
    '/search/all': {
      get: {
        summary: 'Obtener todas las películas',
        description: 'Obtiene una lista de todas las películas disponibles.',
        responses: {
          '200': {
            description: 'Éxito. Devuelve la lista de películas.',
            content: {
              'application/json': {
                example: {
                  movies: [
                    {
                      id: 1,
                      title: 'Ejemplo de película 1',
                      releaseYear: 2022,
                    },
                    // ... más películas
                  ],
                },
              },
            },
          },
          '500': {
            description: 'Error del servidor. Se produjo un error al intentar obtener las películas.',
          },
        },
      },
    },
    '/details/{id}': {
      get: {
        summary: 'Obtener detalles de una película por ID',
        description: 'Obtiene información detallada de una película específica según su ID.',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID de la película',
            required: true,
            schema: {
              type: 'integer',
              format: 'int64',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Éxito. Devuelve los detalles de la película.',
            content: {
              'application/json': {
                example: {
                  title: 'Ejemplo de película 1',
                  description: 'Descripción de la película.',
                  genre: 'Drama, Acción',
                  rating: 8.5,
                },
              },
            },
          },
          '404': {
            description: 'No encontrado. La película con el ID especificado no existe.',
          },
          '500': {
            description: 'Error del servidor. Se produjo un error al intentar obtener los detalles de la película.',
          },
        },
      },
    },
  },
};
