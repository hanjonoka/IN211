import { useEffect, useState } from 'react';
import axios from 'axios';

import './PopularList.css';

function PopularList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/popular`, {
        params: { api_key: 'a0a7e40dc8162ed7e37aa2fc97db5654' },
      })
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="PopularList_container">
      {movies.map((m) => (
        <div
          className="PopularList_element"
          key={m.original_title + '_poplist_div'}
        >
          <img
            src={'https://image.tmdb.org/t/p/w200/' + m.poster_path}
            alt="affiche du film"
          ></img>
          <div className="PopularList_mov_title">{m.original_title}</div>
        </div>
      ))}
    </div>
  );
}

export default PopularList;
