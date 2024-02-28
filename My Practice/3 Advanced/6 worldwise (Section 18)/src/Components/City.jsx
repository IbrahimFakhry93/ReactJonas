import { useParams, useSearchParams } from "react-router-dom";
import styles from "./City.module.css";

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
  const { id } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat"); //* 'lat' inside get, must match the parameter name in the to attribute in link jsx element in CityItem (to={`${id}?${position.lat}&${position.lng}`})
  const lng = searchParams.get("lng");

  // TEMP DATA
  const currentCity = {
    cityName: "Lisbon",
    emoji: "🇵🇹",
    date: "2027-10-31T15:59:59.138Z",
    notes: "My favorite city so far!",
  };

  const { cityName, emoji, date, notes } = currentCity;
  return (
    <>
      <h1> City {id} </h1>
      <p>Position: {`${lat}, ${lng}`}</p>
    </>
  );

  // we were now able to pass this data (position (lat,lng)) here

  // into all kinds of different components (Map, City)

  // without having to store it

  // anywhere inside a React application.

  // So we didn't have to create any new piece of state

  // but instead we just stored it in the URL

  // and then made it accessible everywhere,

  // and so this is going to be really helpful

  // here in the future to move the map

  // to exactly the position of the city that was loaded here.

  // return (
  //   <div className={styles.city}>
  //     <div className={styles.row}>
  //       <h6>City name</h6>
  //       <h3>
  //         <span>{emoji}</span> {cityName}
  //       </h3>
  //     </div>

  //     <div className={styles.row}>
  //       <h6>You went to {cityName} on</h6>
  //       <p>{formatDate(date || null)}</p>
  //     </div>

  //     {notes && (
  //       <div className={styles.row}>
  //         <h6>Your notes</h6>
  //         <p>{notes}</p>
  //       </div>
  //     )}

  //     <div className={styles.row}>
  //       <h6>Learn more</h6>
  //       <a
  //         href={`https://en.wikipedia.org/wiki/${cityName}`}
  //         target="_blank"
  //         rel="noreferrer"
  //       >
  //         Check out {cityName} on Wikipedia &rarr;
  //       </a>
  //     </div>

  //     <div>
  //       {/* <ButtonBack /> */}
  //     </div>
  //   </div>
  // );
}

export default City;
