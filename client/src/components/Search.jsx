// src/components/Search.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = ({ onResultClick }) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (query.trim() === '') {
          setSearchResults([]);
          return;
        }

        const response = await axios.get(`http://localhost:3001/api/search-movies`, {
          params: {
            query,
          },
        });
        setSearchResults(response.data.results);
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
