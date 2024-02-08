import { useState } from "react";
import PropTypes from "prop-types";

const containerStyle = {
  // margin: "100px",
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starsContainerStyle = {
  display: "flex",
  gap: "2px",
};

StarRating.prototype = {
  maxRating: PropTypes.number, //* so maxRating should be entered as number, if will be entered as string for ex. so it will trigger error in the console.
  color: PropTypes.string,
  size: PropTypes.number,
  messages: PropTypes.array,
  onMovieRating: PropTypes.func,
  className: PropTypes.string,
};

export default function StarRating({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  className = "",
  messages = [],
  defaultRating = 0,
  onMovieRating,
  onUserRating,
}) {
  //* Since we now want the UI to re-render based on an event,
  //* so we want something to happen on the screen, we need state.
  const [rating, setRating] = useState(defaultRating);

  //& Temporary Rating:
  //* The functionality we're implementing allows for a temporary rating to be displayed when hovering over the stars.
  //* This temporary rating, which is the number of stars currently being hovered over, is independent of the actual set rating.
  //* For example, the set rating could be five, but if we hover over three stars, the temporary rating changes to three.
  //* To implement this, we need a new piece of state to store the temporary rating.
  //* This is necessary because we want the component to re-render and display the temporary rating whenever a hover event occurs.

  const [tempRating, setTempRating] = useState(0);
  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size / 1.5}px`,
  };

  //* The 'textStyle' object needs to be defined within the 'StarRating' component.
  //* This is because we're specifying some properties in 'textStyle' that depend on the component's props.
  //* Since props are only accessible inside the component, 'textStyle' must also reside inside the component.

  //! create hanlding state function
  function handleRating(rating) {
    setRating(rating);
    // onMovieRating(rating);   //* with comp Test
    onUserRating(rating);
  }

  return (
    <div style={containerStyle} className={className}>
      <div style={starsContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          //* We're creating a handler function in the 'StarRating' component, which owns the state.
          //* This handler function is passed as a prop to the 'Star' component, which wants to update the state.
          //* This allows the 'Star' component to trigger state updates in the 'StarRating' component.
          <Star
            key={i}
            onRating={() => handleRating(i + 1)}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            // full={tempRating >= i + 1 || rating >= i + 1}
            size={size}
            color={color}
          />
        ))}
      </div>
      <p style={textStyle}>
        {messages.length === maxRating
          ? messages[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ""}
      </p>
    </div>
  );
}

//* there is no hover event, but there is mouse enter and mouse leave and we have to handle both to get the hover effect
function Star({ onRating, onHoverIn, onHoverOut, full, size, color }) {
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: "block",
    cursor: "pointer",
  };
  return (
    <span
      role="button"
      style={starStyle}
      //* We need to listen for the click event on a JSX element, such as an HTML element like a 'span'.
      //* The event handling always needs to occur on the JSX element itself.
      onClick={onRating}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}

//& Difference Between Two Expressions

//? Expression 1: full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
//* This is a ternary operation that checks if 'tempRating' is truthy.
//* If 'tempRating' is truthy, it checks if 'tempRating' is greater than or equal to 'i + 1'.
//* If 'tempRating' is falsy, it checks if 'rating' is greater than or equal to 'i + 1'.
//* This means that it prioritizes 'tempRating' over 'rating'.

//? Expression 2: full={tempRating >= i + 1 || rating >= i + 1}
//* This is a logical OR operation that checks if either 'tempRating' is greater than or equal to 'i + 1' or 'rating' is greater than or equal to 'i + 1'.
//* If either condition is true, it returns true.
//* This means that it considers both 'tempRating' and 'rating' at the same time.

//? View Effect on the Webpage:
//* The first expression will display the temporary rating (when hovering over the stars) if it exists, otherwise, it will display the actual rating.
//* The second expression will display a star as full if either the temporary rating or the actual rating meets the condition, potentially leading to a different visual representation.
