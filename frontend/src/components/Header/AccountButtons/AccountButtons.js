import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function AccountButtons() {
  const [cookies, setCookie, removeCookie] = useCookies();

  const [user, setuser] = useState();

  useEffect(() => {
    if (cookies.userId) {
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}/users/getById?id=${cookies.userId}`
        )
        .then((response) => {
          setuser(response.data);
        });
    }
  }, [cookies.userId]);

  return cookies.token ? (
    <div className="Header-container">
      <div>|</div>
      <Link className="Link" to="/logout">
        Logout
      </Link>
      <div>|</div>
      <span>Bonjour {user ? user.firstname : '...'}</span>
    </div>
  ) : (
    <div className="Header-container">
      <div>|</div>
      <Link className="Link" to="/signup">
        Signup
      </Link>
      <div>|</div>
      <Link className="Link" to="/login">
        Login
      </Link>
    </div>
  );
}

export default AccountButtons;
