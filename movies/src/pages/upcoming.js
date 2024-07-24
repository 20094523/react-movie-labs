import React, { useState, useEffect } from "react";
import PageTemplate from '../components/templateMovieListPage'
import { getUpcoming } from "../api/tmdb-api";
import AddToPlaylist from '../components/cardIcons/addToPlaylist'

const HomePage = (props) => {
  const [movies, setMovies] = useState([]);
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))

  useEffect(() => {
    getUpcoming().then(movies => {
      setMovies(movies);
    });
  }, []);

  return (
    <PageTemplate
      title='Upcoming Movies'
      movies={movies}
      action={(movie) => {
        return <AddToPlaylist movie={movie} />
      }}
    />
  );
};
export default HomePage;