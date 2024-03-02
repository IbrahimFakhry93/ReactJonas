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
  //   let's now use this data

  // to actually do the reverse geocoding.

  // So getting the city information, or really any information,

  // about the GPS position that we are currently located at.

  // Let's just call this lat, and lng.

  // And then we want to fetch this data

  // right when the component mounts.

  // So that's a useEffect for that.

  //   Now, the data that we're gonna fetch here is not going

  // to go into our global state,

  // so into the global city's context,

  // because this data is only relevant

  // for then creating a city's object that will be added

  // to the array.

  // So you only really need this data right here

  // in this component.

  const Base_URL = `https://api.bigdatacloud.net/data/reverse-geocode-client`;

  useEffect(
    function () {
      //& to fix the form in case there is no latitude in longitude in the URL.
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

    //* then create that function
    //   which uploads this new object to our fake API.

    // And just like all the other functions

    // that are about that API, we do that in the context.

    await createCity(newCity);
    navigate("/app/cities");
  }

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

//! video  234: fetching data city in the form (form component)

// we're gonna use the position data

// in order to fetch all necessary information

// about the city where the user has clicked.

// So for example, if the user clicks here on Rome,

// then we want to automatically fetch that data here

// from an API, so from a reverse geocoding API.

// so let's open up our form,

// and now the first thing that we need to do is

// to actually get the location data

// from the URL into this component.

// So reading here,

// this global state that is stored in the url.
// and that was done before in map comp. so create custom hook called useUrlPosition
//=======

//! video 235:

// it's time to finally add a new city and upload it to our fake API.

//*  npm i react-datepicker:  give us a date picker component for React.

//^===

// but now watch what happens as we go back.

// So maybe we expect to now see this city name there,

// but as we go back, it is not there.

// So it hasn't been added to this state right here.

// So why do you think that is?

// Well, if we think about this, then it actually makes sense

// because nowhere in our code we are updating the state

// that is displaying these cities here.

// So these cities are simply fetched once in the beginning

// but they're never updated.

// So this cities stayed right here.

// Again, it is fetched in the beginning,

// but we did not update that, right?

// Now if we reloaded the page

// then that new city would appear down here.

// But that's only because, well, we re-fetched the data.

// And so then of course, it needs to be there.

// And so what we also need to do here

// is to add that new city to our state.

// So basically, we're gonna keep the application state

// in sync with the state from the UI.

// Or in other words, using the terminology

// that we have learned earlier in the section

// we're gonna keep the UI state in sync with remote state.

// Now, this is usually not the way to go

// but in a small application like this one

// it is perfectly fine of doing this.

// And then the next big application

// we will then learn how to better do this.

// So there we will use a specialized tool called React Query

// which will make it so

// that whenever we add something new to the remote state

// that data will then automatically get re-fetched

// into our application.

// So that would fix this problem.

// But in this case we will just do the same thing manually.

// So we'll now just also setCities

// and then we take the current cities and return a new array

// with the current cities plus the data,

// which is basically the new city.

//====================================
//! recap of video 235:
// So let's just very quickly recap everything that we did.

// So first of all, we got the position basically from the URL

// as soon as the form is opened.

// So for that, we created this custom hook

// which will get us the latitude and longitude.

// Then each time those change

// we fetch the data about that location.

// So the city name, the country name and so on

// so that we can then display that here nicely in the form.

// So otherwise the user would have to write that out manually

// which is not nice.

// It would also not have been nice

// if they had to write out the date here manually.

// Therefore, we gave the users this date picker

// so that they can choose from there.

// And then with all the data in place

// we are ready to submit the form.

// So then we create this new object here

// and pass that into the createCity function.

// So this createCity function lives in our cities context

// along with all the other functions that are responsible

// for updating the state that is related to cities.

// And so that's why this lives here.

// And so this then creates a post request, which will mutate,

// so it'll update the server state, so the remote state.

// And we then also update the UI state right here

// so that the new object immediately gets reflected

// in our UI here as well.

// So otherwise, we would have to manually re-fetch the data

// so that it then shows up.

// And then finally, after all that is done,

// so we await that operation here,

// and then in the end we navigate back to the page

// where we came from.
//====================================

//! video 236: delete city (city item comp)

// So, all that we need to do is to create a function

// that will delete a city from the API

// and here from the state, and then just call that function

// when we click on this button.
