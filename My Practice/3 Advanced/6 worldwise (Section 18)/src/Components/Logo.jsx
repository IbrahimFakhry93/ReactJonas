import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

// we are using Link not NavLink because we don't need unessecary styles

function Logo() {
  return (
    <Link to="/">
      <img src="/logo.png" alt="WorldWise logo" className={styles.logo} />
    </Link>
  );
}

export default Logo;
