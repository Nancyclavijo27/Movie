import React, { useState, useEffect } from 'react';
import { getMovieDetails } from '../services/api';

const MovieDetail = ({ movieId }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('MovieDetail component is mounted with movieId:', movieId);
    const fetchData = async () => {
      if (!movieId) {
        return;
      }

      try {
        setLoading(true);
        const details = await getMovieDetails(movieId);

        if (details && details.title) {
          setSelectedMovie(details);
        } else {
          console.error('Movie details not available:', details);
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

  if (loading) {
    return <p>Cargando...</p>;
  }

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
