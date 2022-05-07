import { useEffect, useState } from 'react';
import axios from 'axios';

import './PopularList.css';

const DEFAULT_FORM_VALUES = {
  field: 'title',
  order: 'ASC',
  offset: 0,
  limit: 10,
};

function PopularList() {
  const [movies, setMovies] = useState([]);
  const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKDEND_URL}/movies/list?field=${formValues.field}&order=${formValues.order}&offset=${formValues.offset}&limit=${formValues.limit}`
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
    <div>
      <form className="select_critere_form">
        <label for="field_select">
          Order By:
          <select
            name="field"
            id="field_select"
            value={formValues.field}
            onChange={(event) =>
              setFormValues({ ...formValues, field: event.target.value })
            }
          >
            <option value="title">Titre</option>
            <option value="release_date">Date</option>
          </select>
        </label>
        <select
          name="order"
          id="order_select"
          value={formValues.order}
          onChange={(event) =>
            setFormValues({ ...formValues, order: event.target.value })
          }
        >
          <option value="ASC">Croissant</option>
          <option value="DESC">Décroissant</option>
        </select>
      </form>

      <div className="PopularList_container">
        {movies.map((m) => (
          <div className="PopularList_element" key={m.title + '_poplist_div'}>
            <img src={m.poster_url} alt="affiche du film"></img>
            <div className="PopularList_mov_title">{m.title}</div>
          </div>
        ))}
      </div>

      <button
        name="load_more_button"
        id="load_more_button"
        onClick={() =>
          setFormValues({
            ...formValues,
            limit: formValues.limit + 10,
          })
        }
      >
        LOAD MORE
      </button>
    </div>
  );
}

export default PopularList;
