const express = require('express');
const router = express.Router();
const axios = require('axios');

/**
 * @swagger
 * /details/{id}:
 *   get:
 *     summary: Obtiene detalles de una película por su ID.
 *     description: Retorna detalles específicos de una película.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la película.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Éxito, devuelve los detalles de la película.
 *         content:
 *           application/json:
 *             example:
 *               title: 'Nombre de la película'
 *               description: 'Descripción de la película.'
 *               genre: 'Acción, Aventura'
 *               rating: 8.5
 */

router.get('/details/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${process.env.TMDB_API_URL}/movie/${id}`, {
      params: {
        api_key: process.env.TMDB_API_KEY,
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
