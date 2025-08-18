import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import { AuthContext } from '../components/Context/AuthContext';
import '../style/Login.css';

const Login = () => {
  const { login: loginHook, loading, error } = useLogin();
  const { login } = useContext(AuthContext); // para actualizar estado global
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await loginHook(email, password);
    if (data?.token) {
      login(data.token); // actualiza AuthContext
      navigate('/'); // redirige al home
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Iniciar Sesión</h2>

        {error && <p className="error-msg">{error}</p>}

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Cargando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
};

export default Login;
