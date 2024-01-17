// src/components/MovieDetail.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieDetail = ({ movieId }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/movie-details/${movieId}`);
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
      {selectedMovie && (
        <div>
          <h2>{selectedMovie.title}</h2>
          <p>{selectedMovie.overview}</p>
          <p>Genre: {selectedMovie.genre}</p>
          <p>Rating: {selectedMovie.vote_average}</p>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
