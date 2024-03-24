import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
// import { useCities } from "../Contexts/citiesContext";
import { useCities } from "../Contexts/citiesContextRed";
import { useGeolocation } from "../Hooks/useGeoLocation";
import Button from "./Button";
import { useUrlPosition } from "../Hooks/useUrlPosition";

//! Video 230: Including a Map With the Leaflet Library
//* create MapPosition state
//* turn from scrollWheelZoom={false} to true, to enable zoom scrolling
//* add className={styles.map} to display the map
//* Edit the display of the tile layer by url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"

//!video 231: handle the popup (Displaying City Markers on Map)
function Map() {
  const { cities } = useCities();
  const [MapPosition, setMapPosition] = useState([40, 0]); //* when position changed , the map should be rendered
  const [mapLat, mapLng] = useUrlPosition();
  //* rename isLoading and position because we have their names here before to avoid any confusion
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();

  //*  we want when click on back btn, map stays at the last selected city location
  //& Title: State Management in Map Component

  //? Remembering Latitude and Longitude
  //* We want our map component to remember this latitude and longitude over time.
  //*  That's why we created a state variable at the very beginning.
  //*  This `mapPosition` is where we will want to remember the map's longitude and latitude.
  //! we need this effect with map and mapLng to solve the problem that when we go back,
  //! that map stays at the last selected city
  //? Synchronizing State and Component
  //* We now need to synchronize the two of them. Let's use an effect for that.

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  //* to synchronize this map position with the geolocation position.
  //*  we will need another effect to do that.

  useEffect(
    function () {
      if (geoLocationPosition)
        //* at first geoLocationPosition is null
        setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
    },
    [geoLocationPosition]
  );

  //! you can change your current gps location by: browser => inspect => application => sensors => location

  //& Title: Geolocation and Rendering in React

  //? Initial State
  //* At the beginning, the geolocation position will by default still be null, so this code doesn't run.

  //? Updating Geolocation
  //* As we click this button, the geolocation gets retrieved and this state updates.

  //? Running the Effect
  //* This effect then runs, which in turn sets the map position.
  //* This causes the whole component to re-render once more,
  //* and finally, the map can move to that new position.

  //? Effect on Rendering
  //* This effect introduces another render,
  //* which is one of the reasons why we should avoid having too many effects.
  //* We will learn more about this in the next section.

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "loading..." : "use your location"}
        </Button>
      )}

      <MapContainer
        center={MapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map} //* without this class, the height will be 0 and map not shown
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.cityName}</span>
              <span>{city.emoji}</span>
            </Popup>
          </Marker>
        ))}
        {geoLocationPosition && (
          <Marker position={[geoLocationPosition.lat, geoLocationPosition.lng]}>
            <Popup>My location</Popup>
          </Marker>
        )}
        {/* give mapLat, mapLng default values so when click on back button we won't get error because they will be undefined  */}
        <ChangeCenter position={MapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

//& this comp is made by us to move the map to a certain position
function ChangeCenter({ position }) {
  const map = useMap(); //* map instance , useMap() is built-in comp
  map.setView(position); //* SetView is builtin method in leaflet
  return null; //* ChangeCenter is component so it must return some JSX even if it's null
}

function DetectClick() {
  const navigate = useNavigate();
  //* useMapEvents is from leaflet
  useMapEvents({
    click: (e) => {
      console.log(e); //* e is event object from leaflet
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;

//& Title: Video 231 - Handling the Popup and Marker

//? Displaying Markers and Popups for Cities
//* Let's display one marker and popup for each of our cities.
//* This means we now need to get access to the cities in this map component by using the cities context (useCities)

//? Accessing Global State
//* we now have our global state (cities)
//* This state, which lives inside our context, can be easily made available to any component we want.

//^ Looping Over Cities
//? Marker Placement
//* We don't want a marker at a fixed position.

//? City Object Markers
//* Instead, we aim to place one marker for each city object.

//? Looping Over Cities Array
//* We will loop over the cities array and display a marker for each city.

//*=======================
//& Title: Marker Style
//? Global Trick Usage
//* Notice how we need to use this trick of making this global
//* so that CSS modules don't attach any of these random strings to our classes.

//? Mapping to Leaflet Exports
//* This is because they would not map to the classes that leaflet exports.
//~ :global(.leaflet-popup .leaflet-popup-content-wrapper)  in map.module.css
//*============================

//! video 232:   Interacting With the Map

//& Title: City Selection and Map Positioning
//? Clicking on Cities
//* When we click on one of these cities, it should not only open the city component,
//* but also move to that position on the map.

//? Updating Map Position State
//* We will want to update our map position state accordingly.

//? Setting Map Position
//* Let's set the position of the map to the currently selected city and attach an event handler to the map.

//& Title: Implementing Functionality with Leaflet
//? Custom Component Creation
//* We need to implement this functionality (moving the map when selecting the city)
//* on our own within this Leaflet library.
//* Everything works with components in this library.

//? Using Custom Component  ( ChangeCenter)
//* Whenever we need to implement a functionality like this (moving the map when selecting the city)),
//* we need to create a custom component (changeCenter) and then use that component in here.

//? Open form after click on map:
//* also create custom component (DetectClick)
//* implement that feature that opens the form whenever we click somewhere on the map.

//& Title: Form Component Access
//? Position Access
//* We need to give this form component access to the position where the click on the form occurred.

//? Leveraging URL
//* Let's leverage the power of the URL to store that state.

//? Navigation and Data Storage
//* As we click, we can navigate to the form with the latitude and longitude set to wherever the click happened.

//? Data Reading
//* Inside the form, we can easily read that data from the URL, just like we did in the map component.
//~  navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);

//? Global State Usage
//* We are using this kind of global state to pass data between pages.
//* Without this, we would have to create a global state variable to temporarily store that position,
//* which would be more work than simply storing it in the URL.

//^ Wrap Up: Video 232
//? Map Component Interactions
//* We added two interactions to our Map component.
//* First, the interaction where we can move the map around as we click on different cities (in cities list)
//~ done by: ChangeCenter Comp
//* Second, we can now interact with the map, by clicking on it.
//~ done by: DetectClick Comp
//*======================================================================================

//! video 233: Setting Map Position With Geolocation
//* create Hooks folder and create custom hook useGeolocation

//* we can then use the get position function inside useGeolocation hook
//* on any button to retrieve the current position of our user.

//*==============================================

//! Title: Video 234 - Fetching City Data in the Form Component
//? Position Data Usage
//* We're going to use the position data to fetch all necessary information about the city
//* where the user has clicked.

//? Example: Click on Rome
//* For example, if the user clicks on Rome, we want to automatically fetch that data from a reverse geocoding API.

//*=============================================
