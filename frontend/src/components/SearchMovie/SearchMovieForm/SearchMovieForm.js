import { useState } from 'react';

function SearchMovieForm(props) {
  const [movie, setMovie] = useState(props.movie);

  return (
    <div>
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
