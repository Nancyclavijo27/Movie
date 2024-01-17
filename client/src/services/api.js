// src/services/api.js
import axios from 'axios';

const tmdbAxios = axios.create({
  baseURL: 'http://localhost:3001',
});

export const searchMovies = async (query) => {
  try {
    const response = await tmdbAxios.get('/search/all', {
      params: {
        query: query,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await tmdbAxios.get(`/details/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};

export const getSuggestions = async () => {
  try {
    const response = await tmdbAxios.get('/movies/popular'); // Ajusta según tus necesidades
    return response.data;
  } catch (error) {
    console.error('Error fetching movie suggestions:', error);
    return [];
  }
};
