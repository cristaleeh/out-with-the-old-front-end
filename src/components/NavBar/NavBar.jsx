import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import styles from './NavBar.module.css'; // SCSS module

export default function NavBar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/'); // send user back to landing page on logout
  };

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.link}>All products</Link>


    <div className={styles.links}>
      {user && (
        <>
          <Link to='/dashboard' className={styles.link}> My products</Link>
          <Link to="/products/new" className={styles.addButton}>Add + </Link>
          <span className={styles.welcome}>Hi, {user.username} 💖 </span>
          <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
        </>
      )}

        {!user && (
          <>
            <Link to="/sign-in" className={styles.link}>Sign In</Link>
            <Link to="/sign-up" className={styles.link}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
