import './MovieList.css';

function MovieList(props) {
  return (
    <div className="MovieList_container">
      {props.movies.map((m) => (
        <div className="MovieList_element" key={m.title + '_poplist_div'}>
          <img src={m.poster_url} alt="affiche du film"></img>
          <div className="MovieList_mov_title">{m.title}</div>
        </div>
      ))}
    </div>
  );
}

export default MovieList;
