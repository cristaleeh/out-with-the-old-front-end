import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import styles from './AuthForm.module.css';

import { signIn } from '../../services/authServices';

import { UserContext } from '../../contexts/UserContext';

const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const signedInUser = await signIn(formData);
      setUser(signedInUser);
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main className={styles.container}>
      <section>
        <form autoComplete="off" onSubmit={handleSubmit} className={styles.formBox}>
          <h1>SIGN IN_</h1>
          <p>{message}</p>
          <div>
            <label htmlFor="username">USERNAME_:</label>
            <input
              className={styles.input}
              type="text"
              autoComplete="off"
              id="username"
              value={formData.username}
              name="username"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">PASSWORD_:</label>
            <input className={styles.input}
              type="password"
              autoComplete="off"
              id="password"
              value={formData.password}
              name="password"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <button className={styles.button}>LOGIN</button>
            <button type="button" className={styles.button} onClick={() => navigate('/')}>Cancel</button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default SignInForm;