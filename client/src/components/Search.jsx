import React, { useState, useEffect } from 'react';
import { getSuggestions } from '../services/api';
import './Search.css';

const Search = ({ onSearch, onResultClick }) => {
  // Estado para almacenar la cadena de búsqueda
  const [query, setQuery] = useState('');

  // Estado para almacenar los resultados de la búsqueda
  const [searchResults, setSearchResults] = useState([]);

  // Estado para almacenar las sugerencias
  const [suggestions, setSuggestions] = useState([]);

  // Efecto secundario para obtener sugerencias al montar el componente
  useEffect(() => {
    const fetchSuggestions = async () => {
      const suggestions = await getSuggestions();
      setSuggestions(suggestions);
    };

    fetchSuggestions();
  }, []);

  // Manejar cambios en la cadena de búsqueda
  const handleQueryChange = async (event) => {
    const inputQuery = event.target.value;
    setQuery(inputQuery);

    // Obtener nuevas sugerencias basadas en la cadena de búsqueda actual
    const newSuggestions = await getSuggestions(inputQuery);
    setSuggestions(newSuggestions);

    // Filtrar sugerencias basadas en la cadena de búsqueda y actualizar los resultados de búsqueda
    const filteredSuggestions = newSuggestions.filter(
      (movie) =>
        movie.title.toLowerCase().includes(inputQuery.toLowerCase()) ||
        movie.releaseYear.toString().includes(inputQuery)
    );

    setSearchResults(filteredSuggestions);

    // Llamar a la función onSearch del componente padre con la cadena de búsqueda y los resultados filtrados
    onSearch(inputQuery, filteredSuggestions);
  };

  // Renderizar el componente
  return (
    <div className="search-container">
      {/* Campo de entrada para la búsqueda */}
      <input
        type="text"
        placeholder="Buscar películas..."
        value={query}
        onChange={handleQueryChange}
      />

      {/* Mostrar mensaje de error si no hay resultados y la cadena de búsqueda no está vacía */}
      {searchResults.length === 0 && query !== '' && (
        <p className="error-message">No se encontraron resultados para "{query}". Intenta buscar otra película.</p>
      )}

      {/* Lista de resultados de búsqueda */}
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

// Exportar el componente Search
export default Search;
