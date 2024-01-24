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
 *       '400':
 *         description: ID de película no válido.
 *         content:
 *           application/json:
 *             example:
 *               error: 'ID de película no válido'
 *       '500':
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             example:
 *               error: 'Internal Server Error'
 */

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ error: 'ID de película no válido' });
    }

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

    return res.json(movieDetails);
  } catch (error) {
    console.error(error);

    if (error.response) {
      return res.status(error.response.status).json({ error: error.response.data });
    } else if (error.request) {
      return res.status(500).json({ error: 'No se recibió respuesta del servidor' });
    } else {
      return res.status(500).json({ error: 'Error durante la configuración de la solicitud' });
    }
  }
});

module.exports = router;
