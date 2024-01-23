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

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // Validar que el ID sea un número válido antes de hacer la solicitud
    if (isNaN(id) || id <= 0) {
      res.status(400).json({ error: 'ID de película no válido' });
      return;
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

    res.json(movieDetails);
  } catch (error) {
    console.error(error);
  
    if (error.response) {
      // La solicitud se completó, pero el servidor respondió con un código de estado diferente de 2xx
      console.error('Error de respuesta del servidor:', error.response.data);
      res.status(error.response.status).json({ error: error.response.data });
    } else if (error.request) {
      // La solicitud fue hecha, pero no se recibió respuesta
      console.error('No se recibió respuesta del servidor:', error.request);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Ocurrió un error durante la configuración de la solicitud
      console.error('Error durante la configuración de la solicitud:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

module.exports = router;
