import React from "react";
import { getUpcoming } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToWatchlist from '../components/cardIcons/addToWatchlist';

const UpcomingPage = (props) => {
  // Use useQuery hook for data fetching and caching
  const { data, error, isLoading, isError } = useQuery('upcoming', getUpcoming);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite);
  localStorage.setItem('favorites', JSON.stringify(favorites));

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => {
        return <AddToWatchlist movie={movie} />
      }}
    />
  );
};

export default UpcomingPage;