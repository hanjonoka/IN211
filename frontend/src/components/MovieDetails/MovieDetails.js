import MovieComments from '../MovieComments/MovieComments';
import './MovieDetails.css';

function MovieDetails(props) {
  return (
    <div className="modal-details">
      <div className="header-modal-details">
        <button className="close-modal-details" onClick={() => props.close()}>
          &times;
        </button>
        <div className="title-modal-details"> {props.movie.title} </div>
        <div className="date-modal-details">
          {' '}
          Release date : {props.movie.release_date}{' '}
        </div>
        {props.movie.mean_mark && props.movie.mean_mark >= 0 ? (
          <div className="mark-modal-details">
            Score : {props.movie.mean_mark}
          </div>
        ) : (
          ''
        )}
        <div className="overview-modal-details"> {props.movie.overview}</div>
      </div>
      <MovieComments className="content-modal-details" movie={props.movie} />
    </div>
  );
}

export default MovieDetails;
