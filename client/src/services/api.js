import axios from 'axios';

// Utiliza el dominio donde se despliega tu backend en lugar de localhost
const baseURL = import.meta.env.VITE_REACT_APP_BACKEND_URL || 'https://movapi-0u9d.onrender.com';

const tmdbAxios = axios.create({
  baseURL: baseURL,
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
