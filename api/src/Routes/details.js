// backend/routes/details.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
      params: {
        api_key: 'YOUR_TMDB_API_KEY', // Reemplazar con tu clave de API de TMDb
      },
    });

    const movieDetails = {
      title: response.data.title,
      description: response.data.overview,
      genre: response.data.genres.map((genre) => genre.name).join(', '),
      rating: response.data.vote_average,
    };

    res.json(movieDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
