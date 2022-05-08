import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import './App.css';
import { Root } from './components/Root/Root';
import Counter from './pages/Counter/Counter';
import Users from './pages/Users/Users';
import Search from './pages/Search/Search';
import AddMovie from './pages/AddMovie/AddMovie';
import Signup from './pages/Users/Signup/Signup';
import Login from './pages/Users/Login/Login';
import Logout from './pages/Users/Logout/Logout';

function App() {
  return (
    <Root>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="counter" element={<Counter />} />
        <Route path="users" element={<Users />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="about" element={<About />} />
        <Route path="search/:search" element={<Search />} />
        <Route path="addMovie" element={<AddMovie />} />
      </Routes>
    </Root>
  );
}

export default App;
