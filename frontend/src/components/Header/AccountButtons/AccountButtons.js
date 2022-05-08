import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';

function AccountButtons() {
  const [cookies, setCookie, removeCookie] = useCookies();

  return cookies.token ? (
    <div>
      <div>|</div>
      <Link className="Link" to="/logout">
        Logout
      </Link>
      <div>|</div>
      <span>Bonjour</span>
    </div>
  ) : (
    <div>
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
