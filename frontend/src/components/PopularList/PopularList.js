import { useEffect, useState } from 'react';
import axios from 'axios';

import './PopularList.css';

const DEFAULT_FORM_VALUES = {
  field: '',
  order: '',
  offset: '',
  limit: '',
};

function PopularList() {
  const [movies, setMovies] = useState([]);
  const [orderField, setOrderField] = useState('');

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKDEND_URL}/movies/list?field=${orderField}`
      )
      .then((response) => {
        console.log(response.data);
        setMovies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [orderField]);

  return (
    <div>
      <label for="order_field_select">
        Order By :
        <select
          name="order_field"
          id="order_field_select"
          value={orderField}
          onChange={(event) => setOrderField(event.target.value)}
        >
          <option value="title">Titre</option>
          <option value="release_date">Date</option>
        </select>
      </label>
      <div className="PopularList_container">
        {movies.map((m) => (
          <div className="PopularList_element" key={m.title + '_poplist_div'}>
            <img src={m.poster_url} alt="affiche du film"></img>
            <div className="PopularList_mov_title">{m.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularList;
