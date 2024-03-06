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
  //*'lat' inside get, must match the parameter name in the (to) attribute in link jsx element
  //* in CityItem (to={`${id}?${position.lat}&${position.lng}`})
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <>
      <h1> City {id} </h1>
      <p>Position: {`${lat}, ${lng}`}</p>
    </>
  );

  //& Title: Data Management in React

  //? Passing Data to Components
  //* We were able to pass the position data (lat, lng) into various components (Map, City) without having to store it anywhere inside the React application.

  //? Avoiding New State Creation
  //* We didn't have to create any new piece of state. Instead, we stored the data in the URL and made it accessible everywhere.

  //? Future Use Case
  //* This approach will be really helpful in the future to move the map to the exact position of the city that was loaded.
}

export default City;
