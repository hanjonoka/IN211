import { useState } from 'react';
import './SearchMovieForm.css';

function SearchMovieForm(props) {
  const [movie, setMovie] = useState(props.movie);

  return (
    <div className="search-form-container">
      <div>Search Movie</div>
      <form className="searchMovieForm" action={'/search/' + movie}>
        <input
          className="searchMoVieInput"
          placeholder="Movie"
          value={movie}
          onChange={(event) => {
            setMovie(event.target.value);
          }}
        ></input>
        <button className="searchMovieButton" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchMovieForm;
