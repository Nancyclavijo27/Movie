require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./src/config/swaggerConfig');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

// Importar rutas
const searchRoutes = require('./src/Routes/search');
const detailsRoutes = require('./src/Routes/details');

// Usar las rutas
app.use('/search', searchRoutes);
app.use('/details', detailsRoutes);

// Configurar Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Ruta para obtener todas las películas populares
app.get('/movies/popular', async (req, res) => {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
      params: {
        api_key: process.env.TMDB_API_KEY,
        language: 'en-US',
        page: 1,
      },
    });

    const movies = response.data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      releaseYear: movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A',
    }));

    res.json(movies);
  } catch (error) {
    console.error('Error en la solicitud Axios:', error);
    res.status(500).json({ error: 'Error al obtener películas populares' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
