import axios from 'axios';
import { useState } from 'react';

const DEFAULT_FORM_VALUES = {
  title: '',
  release_date: '',
  poster_url: '',
  tmdb_id: '',
};

const useSaveMovie = () => {
  const [movieCreationError, setMovieCreationError] = useState(null);
  const [movieCreationSuccess, setMovieCreationSuccess] = useState(null);

  const saveMovie = (event, formValues, setFormValues) => {
    event.preventDefault();

    setMovieCreationError(null);
    setMovieCreationSuccess(null);
    if (formValues.title === '' && formValues.tmdb_id === '') {
      setMovieCreationError('title cannont be empty');

      return;
    }

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/movies/new`, formValues)
      .then(() => {
        setMovieCreationSuccess('Successfully added the movie.');
        setFormValues(DEFAULT_FORM_VALUES);
      })
      .catch((error) => {
        setMovieCreationError('Could not add movie.');
        console.log(error);
      });
  };

  return { saveMovie, movieCreationError, movieCreationSuccess };
};

function AddMovieForm() {
  const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES);
  const { saveMovie, movieCreationError, movieCreationSuccess } =
    useSaveMovie();

  return (
    <div>
      <form
        className="addMovieForm"
        onSubmit={(event) => saveMovie(event, formValues, setFormValues)}
      >
        <input
          className="addMovieInput"
          placeholder="title"
          value={formValues.title}
          onChange={(event) =>
            setFormValues({ ...formValues, title: event.target.value })
          }
        ></input>
        <input
          className="addMovieInput"
          type="date"
          value={formValues.date}
          onChange={(event) =>
            setFormValues({ ...formValues, date: event.target.value })
          }
        ></input>
        <input
          className="addMovieInput"
          placeholder="Poster URL"
          value={formValues.poster_url}
          onChange={(event) =>
            setFormValues({ ...formValues, poster_url: event.target.value })
          }
        ></input>
        <input
          className="addMovieInput"
          placeholder="TMDB ID"
          value={formValues.tmdb_id}
          onChange={(event) =>
            setFormValues({ ...formValues, tmdb_id: event.target.value })
          }
        ></input>
        <button type="submit">Add Movie</button>
      </form>
      <div>
        <span style={{ color: 'red' }}>{movieCreationError}</span>
        <span style={{ color: 'green' }}>{movieCreationSuccess}</span>
      </div>
    </div>
  );
}

export default AddMovieForm;
