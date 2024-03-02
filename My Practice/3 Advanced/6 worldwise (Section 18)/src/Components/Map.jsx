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
import { useCities } from "../Contexts/citiesContext";
import { useGeolocation } from "../Hooks/useGeoLocation";
import Button from "./Button";
import { useUrlPosition } from "../Hooks/useUrlPosition";

//! Video 230:
//* create MapPosition state
//* turn from scrollWheelZoom={false} to true, to enable scrolling
//* add className={styles.map} to display the map
//* Edit the display of the tile layer by url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"

//!video 231: handle the popup
function Map() {
  const { cities } = useCities();
  const [MapPosition, setMapPosition] = useState([40, 0]); //* when position changed , the map should be rendere
  const [mapLat, mapLng] = useUrlPosition();
  //* rename isLoading and position because we have their names here before to avoid any confusion
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();

  //*  we want when click on back btn, map stays at the last selected city location
  // so we want our map component

  // to remember this latitude and longitude over time.

  // And so that's the reason

  // why we created a state variable here in the very beginning.

  // So this map position right here.

  // So this is where we will want to remember

  // this map longitude and latitude.

  // And so we now need to synchronize the two of them.

  // So let's use an effect for that,
  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  // we need to do the same thing as before,

  // which is to synchronize this map position now

  // with the geolocation position.

  // So we will need another effect to do that.

  useEffect(
    function () {
      if (geoLocationPosition)
        //* at first geoLocationPosition is null
        setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
    },
    [geoLocationPosition]
  );

  //   Okay, so at the beginning,

  // the geolocation position will by default still be null,

  // and so then this code here doesn't run.

  // But then, as we click this button,

  // the geolocation will get retrieved,

  // and then of course this state here will update.

  // And so then this effect will run,

  // which will then in turn set the map position,

  // which will re-render the whole component once more,

  // and then finally the map can move to that new position.

  // So basically this effect here introduces another render,

  // which is one of the reasons why we should avoid

  // having too many effects.

  // But we will learn more about that in the next section.

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

function ChangeCenter({ position }) {
  const map = useMap(); //* map instance
  map.setView(position);
  return null; //* ChangeCenter is component so it must return sth even if it's nul
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      console.log(e);
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;

//!video 231: handle the popup and marker\

//? Getting the cities
// let's display one marker and pop up

// for each of our cities.

// So, that means that we now need to get access

// to the cities, here in this map component, right?

// Well, for that, we thankfully have now our global state.

// So, the state that is living inside our context

// which is easily made available

// to every single component that we wanted.

//*======================
//& loping over the cities
// e don't want a marker here,

// just in this fixed position,

// but, instead, we want one marker for each city object.

// So, we're, basically, just going to loop over

// that cities array and display one of these for each.

//*=======================

//& Marker Style:
// And notice how, here, again, we need to use this trick

// of making this global so that CSS modules

// then doesn't attach any of these random strings

// to our classes because then they would not map

// to the classes that leaflet exports.

//*============================

//! video 232:
// when we click, here, on one of these cities,

// then it should not only open the city component, here,

// but it should also move to that position on the map.

// So, basically, we will want

// to update our map position state,
//=====
// let's set the position of the map

// to the currently selected city

// and let's also attach an event handler to the map.
//=====
// we need to implement this functionality (moving the map when select the city) on our own

// within this Leaflet library.

// Now in this library, everything works with components.

// So whenever we need to implement a functionality like this

// we need to create a custom component

// and then use that component in here.

//============
//* implement that feature that opens the form whenever we click somewhere on the map.

//=========

// We need to give this form component here, also access

// to the position where they click on the form occurred.

// let's once again leverage the power of the URL here

// and basically just store that state in the URL.

// So as we click here, we can navigate to the form

// with the latitude and longitude

// set to wherever the click happened.

// And so then inside the form

// we can easily read that data from the URL

// just like we did also in the map component already.

// So exactly the same thing.

// So basically using, again,

// this kind of global state to pass data between pages.

// So without this,

// we would have to create some global state variable

// where we would temporarily store that position

// which would be a lot more work

// than simply storing it in the URL.

//===
//* wrap up: video 232
// we just add these two interactions to our Map component.

// So first, the interaction where we can move the map around

// as we click here on different cities.

// And then second, we can now interact with the map

//*===========================

//! video 233:
//* create Hooks folder and create custom hook useGeolocation

// we can then use the get position function inside useGeolocation hook on any button to retrieve the current position of our user.

//*==============================================

//! video  234: fetching data city in the form (form component)

// we're gonna use the position data

// in order to fetch all necessary information

// about the city where the user has clicked.

// So for example, if the user clicks here on Rome,

// then we want to automatically fetch that data here

// from an API, so from a reverse geocoding API.

//*=============================================
