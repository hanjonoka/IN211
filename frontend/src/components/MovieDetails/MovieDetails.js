import MovieComments from '../MovieComments/MovieComments';
import './MovieDetails.css';

function MovieDetails(props) {
  return (
    <div className="modal-details">
      <button className="close-modal-details" onClick={() => props.close()}>
        &times;
      </button>
      <div className="header-modal-details"> {props.movie.title} </div>
      <div className="header-modal-details">
        {' '}
        Release date : {props.movie.release_date}{' '}
      </div>
      {props.movie.mean_mark && props.movie.mean_mark >= 0 ? (
        <div className="header-modal-details">
          Note : {props.movie.mean_mark}
        </div>
      ) : (
        ''
      )}
      <div className="content-modal-details"> {props.movie.overview}</div>
      <MovieComments className="content-modal-details" movie={props.movie} />
      <div className="actions-modal-details">
        <button className="button"> Delete Movie </button>
        <button
          className="button"
          onClick={() => {
            console.log('modal closed ');
            props.close();
          }}
        >
          close overview
        </button>
      </div>
    </div>
  );
}

export default MovieDetails;
