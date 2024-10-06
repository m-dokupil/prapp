import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { login } from '../app/slices/authSlice';
import styled from 'styled-components';

const LoginContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100vh;
  background-image: url('https://cdn.wetransfer.com/_next/static/media/cookie-wall-trees.c260a47c.png');
  background-size: cover;
  background-position: center; 

  .login-card {
    width: 30%;
    margin-right: 50px;
  }

  .p-field {
    margin-bottom: 1.5rem;

    label {
      display: block;
      margin-bottom: 0.5rem;
    }
  }

  .p-shadow-5 {
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  }

  .p-password,
  .p-password > div {
    width: 100%;
  }

  input {
    width: 100%;
  }
`;

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === 'admin' && password === 'password') {
      dispatch(login());
      navigate(from, { replace: true });
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <LoginContainer>
      <div className="login-card">
        <Card title="Login" className="p-shadow-5">
          <form onSubmit={handleLogin}>
            <div className="p-field">
              <label htmlFor="username">Username</label>
              <InputText
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="p-inputtext-lg"
              />
            </div>
            <div className="p-field">
              <label htmlFor="password">Password</label>
              <Password
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                feedback={false}
                toggleMask
                className="p-inputtext-lg"
              />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Button label="Login" type="submit" className="p-mt-3" />
          </form>
        </Card>
      </div>
    </LoginContainer>
  );
};

export default Login;
