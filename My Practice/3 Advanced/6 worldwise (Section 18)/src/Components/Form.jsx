// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useUrlPosition } from "../Hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../Contexts/citiesContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const { createCity, isLoading } = useCities();
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState();
  const [lat, lng] = useUrlPosition();
  console.log(lat);
  const [emoji, setEmoji] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();

  //! video 234: fetching data city in the form (form component)

  //& Title: Reverse Geocoding and Data Fetching
  //? Using Data for Reverse Geocoding
  //* Let's now use this data to do the reverse geocoding.
  //* This involves getting the city information, or really any information,
  //* about the GPS position that we are currently located at.

  //? Latitude and Longitude
  //* Let's just call this latitude (lat) and longitude (lng).

  //? Fetching Data on Component Mount
  //* We want to fetch this data right when the component mounts. We can use a useEffect for that.

  //? Data Storage
  //* The data that we're going to fetch here is not going to go into our global state,
  //* so into the global city's context.
  //*  This is because this data is only relevant for creating a city object that will be added to the array.

  //? Data Usage
  //* We only really need this data right here in this component.

  const Base_URL = `https://api.bigdatacloud.net/data/reverse-geocode-client`;

  useEffect(
    function () {
      if (!lat && !lng) return; //* to prevent HTTP to be fired off, if the user gets to the form by writing Form path on the browser url instead clicking on the map
      async function fetchCityData() {
        try {
          setError("");
          setIsLoadingGeoCoding(true);
          const res = await fetch(
            `${Base_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          if (!data.countryCode) throw new Error("Not a city");

          console.log(data);
          setCityName(data.city || data.locality || "");
          setEmoji(convertToEmoji(data.countryCode));
          setCountry(data.countryName);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoadingGeoCoding(false);
        }
      }
      fetchCityData();
    },
    [lat, lng]
  );

  //* So the handler function (handleSubmit) can be an async function. That's no problem at all.
  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      notes,
      date,
      position: { lat, lng },
    };

    console.log(newCity);

    //* then create that function (createCity)
    //* which uploads this new object to our fake API. And just like all the other functions
    //* that are about that API, we do that in the context (cities Context)

    await createCity(newCity);
    navigate("/app/cities");
  }

  //! video 234: fetching data city in the form (form component)

  //& to fix the form in case there is no latitude in longitude in the URL.

  //* to prevent Form comp to be fired off, if the user gets to the form by writing Form path on the browser url instead clicking on the map

  if (!lat && !lng) return <Message message=" start click on the map " />;

  if (isLoadingGeoCoding) return <Spinner />;

  if (error) return <Message message={error} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.isLoading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;

//? comp: Form - useUrlPosition
//! video 234: fetching data city in the form (form component)

//! Title: Fetching City Information Based on User Click
//? Using Position Data
//* We're going to use the position data to fetch all necessary information about the city where the user has clicked.

//? Example: Click on Rome
//* For example, if the user clicks on Rome, we want to automatically fetch that data from a reverse geocoding API.

//? Opening Form and Getting Location Data
//* Let's open up our form. The first thing we need to do is to get the location data from the URL into this component.

//? Reading Global State from URL (lat, lng)
//* We are reading the global state that is stored in the URL.

//? Custom Hook: useUrlPosition
//* This was done before (Reading Global State from URL (lat, lng)) in the map component.
//* let's create a custom hook called useUrlPosition to handle this.

//*================================================================================================================================

//! Title: Video 235 - Creating a New City
//? Adding a New City
//* It's time to finally add a new city and upload it to our fake API.

//? Date Picker Component
//* We're using 'react-datepicker' to give us a date picker component for React.
//*  npm i react-datepicker:

//& Title: State Update and UI Sync
//? Observing State Change
//* When we go back, we might expect to see the city name there, but it isn't.
//* This is because we haven't updated the state that is displaying these cities.

//? Initial Fetch and State Update
//* These cities are fetched once in the beginning but they're never updated.
//* If we reloaded the page, then the new city would appear because we re-fetched the data.

//? Adding New City to State
//* We also need to add the new city to our state.
//* We're going to keep the application state in sync with the state from the UI,
//* or in other words, keep the UI state in sync with remote state.

//? Using React Query in Future
//* In the next big application, we will use a specialized tool called React Query.
//* This will automatically re-fetch the data into our application whenever we add something new to the remote state.

//? Manual State Update
//* But in this case, we will manually update the state.
//* We'll use setCities and return a new array with the current cities plus the new city.

//^ Recap of Video 235 - Creating a New City
//? Position from URL
//* We got the position from the URL as soon as the form is opened.
//* For that, we created a custom hook (useUrlPosition) which gets us the latitude and longitude.

//? Fetching Location Data
//* Each time those (latitude and longitude) change, we fetch the data about that location so that we can display that in the form.

//? Date Picker for User
//* We gave the users a date picker so that they can choose the date.

//? Submitting the Form
//* With all the data in place, we are ready to submit the form.
//* We create a new object and pass that into the createCity function.

//? Updating State
//* This function lives in our cities context
//* along with all the other functions that are responsible for updating the state related to cities.
//* This creates a post request, which updates the server state,
//* and we also update the UI state so that the new object immediately gets reflected in our UI.

//? Navigating Back
//* Finally, after all that is done, we navigate back to the page where we came from.
//* by this: navigate("/app/cities") in handleSubmit as above

//====================================
