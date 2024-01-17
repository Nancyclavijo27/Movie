// src/App.js
import React, { useState } from 'react';
import Search from './components/Search';
import MovieDetail from './components/MovieDetail';
import {  getMovieDetails } from './services/api';

const App = () => {
  // Estado para almacenar el ID de la película seleccionada
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  // Estado para almacenar los resultados de la búsqueda
  const [searchResults, setSearchResults] = useState([]);

  // Manejar la búsqueda de películas
  const handleSearch = async (query, results) => {
    // Actualizar el estado de los resultados de la búsqueda
    setSearchResults(results);
  };

  // Manejar el clic en un resultado de búsqueda
  const handleResultClick = async (movieId) => {
    // Actualizar el estado con el ID de la película seleccionada
    setSelectedMovieId(movieId);

    // Obtener detalles de la película seleccionada
    const details = await getMovieDetails(movieId);
    console.log('Movie details:', details);
  };

  return (
    <div>
      {/* Componente de búsqueda */}
      <Search onSearch={handleSearch} onResultClick={handleResultClick} />

      {/* Componente de detalles de la película */}
      <MovieDetail movieId={selectedMovieId} />

      {/* No necesitas mostrar las sugerencias aquí, ya que el componente Search se encarga de eso */}
    </div>
  );
};

export default App;
