import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import StarRating from "./starRating";
import App from "./App.js";

// import "./index.css";
// import App1 from "./App-v-1";
// import App2 from "./App-v-2";

function Test() {
  const [movieRating, setMovieRating] = useState(0);
  return (
    <div>
      <StarRating maxRating={7} color={"blue"} onMovieRating={setMovieRating} />
      <p>This movie is rated at {movieRating} ratings </p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <Test /> */}

    {/* <StarRating
      maxRating={5}
      messages={["terrible", "Bad", "okay", "Good", "Amazing"]}
    />
    <StarRating
      maxRating={7}
      size={24}
      color={"red"}
      className="test"
      defaultRating={3}
    /> */}
  </React.StrictMode>
);

//* This additional configuration is crucial because without it, 'StarRating' would be a presentational component,
//* and its state couldn't be used inside the 'Test' component.
//* This makes 'StarRating' more useful and maintains a good balance of configuration options.
