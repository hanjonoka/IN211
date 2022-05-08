import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';

function Logout() {
  const [cookies, setCookie, removeCookie] = useCookies();

  removeCookie('token');
  removeCookie('userId');

  return <Navigate to="/" />;
}

export default Logout;
