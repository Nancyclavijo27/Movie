// src/components/MovieDetail.jsx
import React, { useState, useEffect } from 'react';
import tmdbAxios from '../services/api';

const MovieDetail = ({ movieId }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Agrega una validación para asegurarte de que movieId no sea null
        if (!movieId) {
            return;
          }
  
        const response = await tmdbAxios.get(`/details/${movieId}`);
        setSelectedMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setSelectedMovie(null);
      }
    };

    fetchData();
  }, [movieId]);

  return (
    <div className="detail-container">
      {selectedMovie ? (
        <div>
          <h2>{selectedMovie.title}</h2>
          <p>{selectedMovie.description}</p>
          <p>Genre: {selectedMovie.genre}</p>
          <p>Rating: {selectedMovie.rating}</p>
        </div>
      ) : (
        <p>Selecciona una película para ver detalles.</p>
      )}
    </div>
  );
};

export default MovieDetail;
