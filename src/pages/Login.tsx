import React, { useState, useContext, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import { AuthContext } from '../components/Context/AuthContext';
import '../style/Login.css';

const Login: React.FC = () => {
  const { login: loginHook, loading, error } = useLogin();
  // Se usa 'as any' temporalmente si AuthContext no está tipado aún
  const { login } = useContext(AuthContext) as any; 
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await loginHook(email, password);
    console.log("Respuesta loginHook:", data); // <--- VERIFICAR
    if (data?.token && data?.user?.role) {
      login(data.token, data.user.role, data.user.name); // pasa el rol correcto al contexto
      navigate('/', { replace: true });
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
