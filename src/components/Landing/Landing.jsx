import { Link } from 'react-router-dom'; 
import styles from './Landing.module.css'; 



const Landing = () => { 
  
  
  
return (
  <div className={styles.container}>
      <h1 className={styles.title}> Out With the Old! 💋 </h1> 
      <p className={styles.subtitle}> Keep your glam organized! Track your makeup, skincare, and beauty faves — and never forget an expiry date again. </p> 
      <div className={styles.buttons}> 
        <Link to="/sign-up" className={styles.button}> <button> SIGN UP </button> 
        </Link> <Link to="/sign-in" className={styles.button}> <button> SIGN IN </button> </Link> 
      </div> 
    </div> 
  ); 
}; 
export default Landing;