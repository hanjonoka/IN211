import { Link } from 'react-router-dom';
import AccountButtons from './AccountButtons/AccountButtons';
import './Header.css';

const Header = () => {
  return (
    <div className="Header-container">
      <Link className="Link" to="/">
        Home
      </Link>
      <div>|</div>
      <Link className="Link" to="/counter">
        Counter
      </Link>
      <div>|</div>
      <Link className="Link" to="/users">
        Users
      </Link>
      <div>|</div>
      <Link className="Link" to="/about">
        About
      </Link>
      <div>|</div>
      <Link className="Link" to="/addMovie">
        Add Movie
      </Link>
      <AccountButtons />
    </div>
  );
};

export default Header;
