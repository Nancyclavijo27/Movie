const express = require('express');
const router = express.Router();
const axios = require('axios');

/**
 * @swagger
 * /search/all:
 *   get:
 *     summary: Obtiene todas las películas.
 *     description: Retorna todas las películas disponibles.
 *     responses:
 *       '200':
 *         description: Éxito, devuelve la lista de películas.
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 title: 'Nombre de la película 1'
 *                 releaseYear: 2022
 *               - id: 2
 *                 title: 'Nombre de la película 2'
 *                 releaseYear: 2021
 */

router.get('/all', async (req, res) => {
  try {
    const response = await axios.get(`${process.env.TMDB_API_URL}/movie/popular`, {
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
