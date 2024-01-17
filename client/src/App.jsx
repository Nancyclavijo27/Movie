// src/App.js
import React, { useState } from 'react';
import Search from './components/Search';
import MovieDetail from './components/MovieDetail';
import { searchMovies, getMovieDetails, getSuggestions } from './services/api';

const App = () => {
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = async (query) => {
    const results = await searchMovies(query);
    setSearchResults(results);
  };

  const handleResultClick = async (movieId) => {
    setSelectedMovieId(movieId);
    // Obtener detalles de la película seleccionada
    const details = await getMovieDetails(movieId);
    console.log('Movie details:', details);
  };

  const fetchSuggestions = async () => {
    const suggestions = await getSuggestions();
    setSuggestions(suggestions);
  };

  return (
    <div>
      <Search onSearch={handleSearch} onResultClick={handleResultClick} />
      <MovieDetail movieId={selectedMovieId} />

      {/* Puedes mostrar las sugerencias en algún lugar, como una lista lateral */}
      <div>
        <h3>Sugerencias:</h3>
        <ul>
          {suggestions.map((suggestion) => (
            <li key={suggestion.id} onClick={() => handleResultClick(suggestion.id)}>
              {suggestion.title} ({suggestion.releaseYear})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
