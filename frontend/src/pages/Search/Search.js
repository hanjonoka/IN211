import { useEffect, useState } from 'react';

import axios from 'axios';
import { useParams } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList';
import SearchMovieForm from '../../components/SearchMovie/SearchMovieForm/SearchMovieForm';

function Search() {
  const [movies, setMovies] = useState([]);
  const { search } = useParams();

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/movies/search?search=${search}`
      )
      .then((response) => {
        console.log(response.data);
        setMovies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [search]);

  return (
    <div className="App">
      <SearchMovieForm movie={search} />
      <MovieList movies={movies} />
    </div>
  );
}

export default Search;
