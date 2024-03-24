import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
// import { useCities } from "../Contexts/citiesContext";
import { useCities } from "../Contexts/citiesContextRed";
function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities();
  const { cityName, emoji, date, id, position } = city;
  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    }).format(new Date(date));

  function handleDelete(e) {
    e.preventDefault(); //* so the link is no longer clicked and not direct us to city page, only the button.
    deleteCity(id);
  }

  return (
    <li>
      <Link
        // to add multiple class names with css modules
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        } `}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleDelete}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;

//! video 236: delete city (city item comp)

// So, all that we need to do is to create a function

// that will delete a city from the API

// and here from the state, and then just call that function

// when we click on this button.
