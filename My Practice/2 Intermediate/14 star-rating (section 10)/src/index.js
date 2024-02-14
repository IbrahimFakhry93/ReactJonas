import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import StarRating from "./starRating";

//* The consumer might need to access the 'rating' state outside of the 'StarRating' component.
//* For instance, in a 'Test' component that includes the 'StarRating', they might want to display the rating in their UI.
//* To do this, they need access to the 'rating' state inside the 'StarRating' component, but from within the 'Test' component.
//* They need some state, say 'movieRating', which is initially set to zero.
//* However, 'movieRating' won't change when we rate the movie in the 'StarRating' component.
//* To update 'movieRating' when the state inside 'StarRating' is updated, we allow the consumer to pass in a set function, 'onSetRating'.
//* In the 'handleRating' function, we not only set the internal rating but also set the external rating using 'onSetRating'.
//* This gives the 'Test' component access to the internal state of 'StarRating'.

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
    <Test />

    <StarRating
      maxRating={5}
      messages={["terrible", "Bad", "okay", "Good", "Amazing"]}
    />
    <StarRating
      maxRating={7}
      size={24}
      color={"red"}
      className="test"
      defaultRating={3}
    />
  </React.StrictMode>
);

//* This additional configuration is crucial because without it, 'StarRating' would be a presentational component,
//* and its state couldn't be used inside the 'Test' component.
//* This makes 'StarRating' more useful and maintains a good balance of configuration options.
