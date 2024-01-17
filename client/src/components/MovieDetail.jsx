// src/components/MovieDetail.jsx
import React, { useState, useEffect } from 'react';
import { getMovieDetails } from '../services/api';

const MovieDetail = ({ movieId }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    console.log('MovieDetail component is mounted with movieId:', movieId);
    const fetchData = async () => {
      if (!movieId) {
        return;
      }

      const details = await getMovieDetails(movieId);
      setSelectedMovie(details);
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
