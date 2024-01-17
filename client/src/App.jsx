// src/App.jsx
import React from 'react';
import Search from './components/Search';
import MovieDetail from './components/MovieDetail';
import './App.css'; // Importa tus estilos CSS aquí si es necesario

const App = () => {
  const [selectedMovieId, setSelectedMovieId] = React.useState(null);

  const handleResultClick = (movieId) => {
    setSelectedMovieId(movieId);
  };

  return (
    <div className="app-container">
      <h1>Sistema de Búsqueda de Películas</h1>
      <Search onResultClick={handleResultClick} />
      <MovieDetail movieId={selectedMovieId} />
    </div>
  );
};

export default App;
