// src/App.jsx
import React from 'react';
import Search from './components/Search';
import MovieDetail from './components/MovieDetail';

const App = () => {
  const handleResultClick = (movieId) => {
    // Implementa lógica para manejar la selección de una película
    console.log(`Mostrar detalles de la película con ID: ${movieId}`);
  };

  return (
    <div className="app-container">
      <Search onResultClick={handleResultClick} />
      {/* Puedes agregar otros componentes aquí según sea necesario */}
    </div>
  );
};

export default App;
