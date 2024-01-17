// routes/search.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/all', async (req, res) => {
  try {
    const response = await axios.get(process.env.TMDB_API_URL, {
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
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
