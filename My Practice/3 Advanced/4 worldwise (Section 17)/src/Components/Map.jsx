import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

//& Here is an application of:
//* 1) using of serSearchParams.
//* 2) using of navigate to form after clicking on the map, to enter the details of the city in the form

function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  //* 'lat' inside get, must match the parameter name in the to attribute in link jsx element in CityItem (to={`${id}?${position.lat}&${position.lng}`})
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  return (
    //* imperative way to move to form
    //* navigate("form"); "form" must match same value of Path in route element in App.jsx
    //! <Route path="form" element={<Form />} />
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigate("form");
      }}
    >
      <h1>Map</h1>
      <h1>
        Position: {lat},{lng}
      </h1>
      <button
        onClick={() => {
          setSearchParams({ lat: 23, lng: 50 });
        }}
      >
        Change Pos
      </button>
    </div>
  );
}

export default Map;
