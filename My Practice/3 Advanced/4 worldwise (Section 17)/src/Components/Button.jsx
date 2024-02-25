//* children represents the content
//* onClick
//* type for custom css style ( to conditionally add a CSS class )
import styles from "./Button.module.css";
function Button({ children, onClick, type }) {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}

export default Button;
