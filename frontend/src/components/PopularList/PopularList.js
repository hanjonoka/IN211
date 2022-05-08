import { useEffect, useState } from 'react';
import axios from 'axios';

import './PopularList.css';

import MovieList from '../MovieList/MovieList';

const DEFAULT_FORM_VALUES = {
  field: 'mean_mark',
  order: 'DESC',
  offset: 0,
  limit: 50,
};

function PopularList() {
  const [movies, setMovies] = useState([]);
  const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/movies/list?field=${formValues.field}&order=${formValues.order}&offset=${formValues.offset}&limit=${formValues.limit}`
      )
      .then((response) => {
        console.log(response.data);
        setMovies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [formValues]);

  return (
    <div className="mainList_container">
      <form className="select_critere_form">
        <div>Order By :</div>
        <select
          name="field"
          id="field_select"
          value={formValues.field}
          onChange={(event) =>
            setFormValues({ ...formValues, field: event.target.value })
          }
        >
          <option value="title">title</option>
          <option value="release_date">Date</option>
          <option value="mean_mark">Score</option>
        </select>

        <select
          name="order"
          id="order_select"
          value={formValues.order}
          onChange={(event) =>
            setFormValues({ ...formValues, order: event.target.value })
          }
        >
          <option value="ASC">Increasing</option>
          <option value="DESC">Decreasing</option>
        </select>
      </form>

      <MovieList movies={movies} />

      <button
        name="load_more_button"
        id="load_more_button"
        onClick={() =>
          setFormValues({
            ...formValues,
            limit: formValues.limit + 20,
          })
        }
      >
        LOAD MORE
      </button>
    </div>
  );
}

export default PopularList;
