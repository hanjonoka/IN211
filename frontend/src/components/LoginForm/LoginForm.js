import axios from 'axios';
import { useState } from 'react';
import './LoginForm.css';
import { useCookies } from 'react-cookie';

const DEFAULT_FORM_VALUES = {
  email: '',
  password: '',
};

const useLogin = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [loginError, setLoginError] = useState(null);

  const login = (event, formValues, setFormValues) => {
    event.preventDefault();

    setLoginError(null);
    if (formValues.email === '' || formValues.password === '') {
      setLoginError('please enter your Email and Password.');

      return;
    }

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/users/login`, formValues)
      .then((response) => {
        setCookie('token', response.data.token);
        setCookie('userId', response.data.userId);
        console.log(cookies);
      })
      .catch((error) => setLoginError('Could not login.'));
  };

  return { login, loginError };
};

function LoginForm() {
  const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES);
  const { login, loginError } = useLogin();

  return (
    <div>
      <form
        className="login-form"
        onSubmit={(event) => login(event, formValues, setFormValues)}
      >
        <input
          className="loginorm-input"
          type="email"
          placeholder="Email"
          value={formValues.email}
          onChange={(event) =>
            setFormValues({ ...formValues, email: event.target.value })
          }
        />
        <input
          className="loginorm-input"
          type="password"
          placeholder="password"
          value={formValues.password}
          onChange={(event) =>
            setFormValues({ ...formValues, password: event.target.value })
          }
        />
        <button className="login-button" type="submit">
          Login
        </button>
      </form>
      <div>
        <span className="login-error">{loginError}</span>
      </div>
    </div>
  );
}

export default LoginForm;
