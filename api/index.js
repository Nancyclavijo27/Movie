// index.js
require('dotenv').config(); // Cargar variables de entorno desde el archivo .env
const express = require('express');
const axios = require('axios');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

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
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
