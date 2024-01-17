// src/components/Search.jsx
import React, { useState, useEffect } from 'react';
import tmdbAxios from '../services/api';

const Search = ({ onResultClick }) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await tmdbAxios.get(`/search/all`, {
          params: {
            query: query,
          },
        });
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setSearchResults([]);
      }
    };

    fetchData();
  }, [query]);

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Buscar películas..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      
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
