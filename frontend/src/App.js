import react from 'react'
import React, { useState } from 'react';
import { getFunction } from './services/APIService';

function (App) {

function MovieCatalog() {
  const [movies, setMovies] = React.useState([
    { title: 'The Shawshank Redemption', year: 1994, watched: false },
    { title: 'The Godfather', year: 1972, watched: false },
    { title: 'The Dark Knight', year: 2008, watched: false },
    // Add more movies here
  ]);

  const [searchTerm, setSearchTerm] = React.useState('');
  const [suggestedMovie, setSuggestedMovie] = React.useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddSuggestion = () => {
    if (suggestedMovie) {
      alert(`Suggested to add "${suggestedMovie}" to the catalog!`);
      setSuggestedMovie('');
    }
  };

  const handleToggleWatched = (index) => {
    const updatedMovies = [...movies];
    updatedMovies[index].watched = !updatedMovies[index].watched;
    setMovies(updatedMovies);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isSuggestionAlreadyAdded = movies.some(movie => movie.title.toLowerCase() === suggestedMovie.toLowerCase());

  return (
    <div className="container">
      <h1>Movie Flix Plus</h1>
      <input
        type="text"
        className="search-input"
        placeholder="Buscar Filmes"
        value={searchTerm}
        onChange={handleSearch}
      />
      {filteredMovies.length > 0 ? (
        filteredMovies.map((movie, index) => (
          <div key={index} className="movie">
            <h2>{movie.title}</h2>
            <p>Ano: {movie.year}</p>
            <button
              onClick={() => handleToggleWatched(index)}
              className={`button ${movie.watched ? "watched" : ""}`}>
              {movie.watched ? 'Já assisti' : 'Filme já visto!'}
            </button>

          </div>
        ))
      ) : (
        <div>
          <p>Esse filme não está cadastrado!</p>
          {suggestedMovie && !isSuggestionAlreadyAdded && (
            <div>
              <p>Esse filme não está cadastrado!"{suggestedMovie}" ao catálogo?</p>
              <button onClick={handleAddSuggestion}>Add</button>
            </div>
          )}
          {!suggestedMovie && (
            <div>
              <p>Gostaria de adicionar ao catálogo?</p>
              <input
                
                value={searchTerm}
                onChange={(e) => setSuggestedMovie(e.target.value)}/>
              <button onClick={handleAddSuggestion} className={`button add`}>Adicionar ao catálogo</button>

            </div>
          )}
        </div>
      )}
    </div>
  );
}
}

export default App; 

ReactDOM.render(<MovieCatalog />, document.getElementById('root'));
