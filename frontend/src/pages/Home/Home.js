import { useEffect, useState } from 'react';
import axios from 'axios';

import logo from './logo.svg';
import './Home.css';

import PopularList from '../../components/PopularList/PopularList';

function Home() {
  const [movieName, setMovieName] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <PopularList />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Home;
