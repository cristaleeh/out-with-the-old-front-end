import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { signUp } from '../../services/authServices';
import styles from './AuthForm.module.css';
import { UserContext } from '../../contexts/UserContext';

const SignUpForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    passwordConf: '',
  }); 

  
  
  const { email, username, password, passwordConf } = formData;

  
  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };



  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const newUser = await signUp(formData);
      setUser(newUser)
      navigate('/')
    } catch (err) {
      setMessage(err.message);
    }
  };




  const isFormInvalid = () => {
    return !(email && username && password && password === passwordConf);
  };


  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Sign Up</h1>
      <p>{message}</p>
      <form  className={styles.formBox} onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>E-mail:</label>
          <input
            className={styles.input}
            type='text'
            id='name'
            value={email}
            name='email'
            onChange={handleChange}
            required 
            />
        </div>
        <div>
          <label htmlFor='username'>USERNAME:_</label>
          <input
            className={styles.input}
            type='text'
            id='name'
            value={username}
            name='username'
            onChange={handleChange}
            required
            />
        </div>
        <div>
          <label htmlFor='password'>PASSCODE:_</label>
          <input 
          className={styles.input}
          type='password'
          id='password'
          value={password}
          name='password'
          onChange={handleChange}
          required
          />
        </div>
        <div>
          <label htmlFor='confirm'>CONFIRM PASSCODE:_</label>
          <input 
            className={styles.input}
            type='password'
            id='confirm'
            value={passwordConf}
            name='passwordConf'
            onChange={handleChange}
            required 
            />
        </div>
        <div>
          <button className={styles.button} disabled={isFormInvalid()}>REGISTER_</button>
          <button   onClick={() => navigate('/')} className={styles.link} >CANCEL_</button>
        </div>
      </form>
    </main>
  );
}



export default SignUpForm;