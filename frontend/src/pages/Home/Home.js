import './Home.css';

import PopularList from '../../components/PopularList/PopularList';
import SearchMovieForm from '../../components/SearchMovie/SearchMovieForm/SearchMovieForm';

function Home() {
  return (
    <div className="App">
      <SearchMovieForm />
      <PopularList />
    </div>
  );
}

export default Home;
