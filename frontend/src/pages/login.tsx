import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '@/stores/useAuthStore';
import styles from './login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      router.push('/dashboard');
    } catch (error) {
      alert('Error al iniciar sesión. Revisa tus credenciales.');
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Iniciar Sesión</h2>

        <label className={styles.label}>Email</label>
        <input
          data-cy="email-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="usuario@ejemplo.com"
          className={styles.input}
        />

        <label className={styles.label}>Contraseña</label>
        <input
          data-cy="password-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
          className={styles.input}
        />

        <button data-cy="login-submit" type="submit" className={styles.button}>
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
