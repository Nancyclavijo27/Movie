// src/components/Search.jsx
import React, { useState, useEffect } from 'react';
import { searchMovies, getSuggestions } from '../services/api';

const Search = ({ onResultClick }) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const suggestions = await getSuggestions();
      setSuggestions(suggestions);
    };

    fetchSuggestions();
  }, []);

  const handleSearch = async () => {
    const results = await searchMovies(query);
    setSearchResults(results);
  };

  const handleQueryChange = (event) => {
    const inputQuery = event.target.value;
    setQuery(inputQuery);

    // Filtrar sugerencias basadas en la entrada del usuario
    const filteredSuggestions = suggestions.filter(
      (movie) =>
        movie.title.toLowerCase().includes(inputQuery.toLowerCase()) ||
        movie.releaseYear.toString().includes(inputQuery)
    );
    setSearchResults(filteredSuggestions);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Buscar películas..."
        value={query}
        onChange={handleQueryChange}
      />

      <button onClick={handleSearch}>Buscar</button>

      <ul>
        {searchResults.map((result) => (
          <li key={result.id} onClick={() => onResultClick(result.id)}>
            {result.title} ({result.releaseYear})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
