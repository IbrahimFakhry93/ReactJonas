import { useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useEffect } from "react";
import { useCities } from "../Contexts/citiesContext";
import Spinner from "./Spinner";
import BackButton from "./BackButton";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

//& Here is an application of:
//* 1) Reading the data from the URL

function City() {
  //! video 229:
  // const [currentCity,setCurrentCity]=useState();
  //! note: current city is global state because it's needed in cityItem comp.
  //! to mark the active current city on the cities list (UI Feature)
  //* so place currentCity in the context.

  const { id } = useParams();
  const { getCity, currentCity, isLoading } = useCities();

  // if(isLoading) return <Spinner/> //! this causes error
  //* because React Hook "useEffect" is called conditionally. React Hooks must be called in the exact same order in every component render

  //* this effect could be placed in city comp when it's mounted but it's cleaner to be here in the context
  useEffect(
    function () {
      getCity(id);
    },
    [id]
  );

  if (isLoading) return <Spinner />; //* to solve the issue that previous city will appear for a half of second because the new current one

  const { cityName, emoji, date, notes } = currentCity;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
