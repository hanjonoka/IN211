import Popup from 'reactjs-popup';
import MovieDetails from '../MovieDetails/MovieDetails';
import './MovieList.css';

function MovieList(props) {
  return (
    <div className="MovieList_container">
      {props.movies.map((m) => (
        <Popup
          trigger={
            <div className="MovieList_element">
              <img src={m.poster_url} alt="affiche du film"></img>
              <div className="MovieList_mov_title">{m.title}</div>
            </div>
          }
          modal
          nested
          key={m.title + '_poplist_div'}
        >
          {(close) => (
            <MovieDetails className="popup-details" movie={m} close={close} />
          )}
        </Popup>
      ))}
    </div>
  );
}

export default MovieList;
