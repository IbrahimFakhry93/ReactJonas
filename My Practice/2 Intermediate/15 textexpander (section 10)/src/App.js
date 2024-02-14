import { useState } from "react";
import "./index.css";
//& Section 10: Thinking in React: Components, Composition, and Reusability

//! this App is application on: 

//* Using composition to achieve usable components
//* Using props as component API
export default function App() {
  return (
    <div>
      <TextExpander>
        Space travel is the ultimate adventure! Imagine soaring past the stars
        and exploring new worlds. It's the stuff of dreams and science fiction,
        but believe it or not, space travel is a real thing. Humans and robots
        are constantly venturing out into the cosmos to uncover its secrets and
        push the boundaries of what's possible.
      </TextExpander>

      <TextExpander
        collapsedNumWords={20}
        expandButtonText="Show text"
        collapseButtonText="Collapse text"
        buttonColor="#ff6622"
      >
        Space travel requires some seriously amazing technology and
        collaboration between countries, private companies, and international
        space organizations. And while it's not always easy (or cheap), the
        results are out of this world. Think about the first time humans stepped
        foot on the moon or when rovers were sent to roam around on Mars.
      </TextExpander>

      <TextExpander expanded={true} className="box">
        Space missions have given us incredible insights into our universe and
        have inspired future generations to keep reaching for the stars. Space
        travel is a pretty cool thing to think about. Who knows what we'll
        discover next!
      </TextExpander>
    </div>
  );
}

function TextExpander({
  children,
  collapsedNumWords = 25,
  expandButtonText = "Show more",
  collapseButtonText = "Show less",
  buttonColor = "purple",
  className = "",
  expanded = false,
}) {
  const [expand, setExpand] = useState(expanded);

  // Split the string into an array of words
  let words = children.split(" ");

  // Remove the last 12 words
  words = words.slice(0, -collapsedNumWords);

  // Join the words back into a string
  const result = words.join(" ");

  console.log(result);

  function handleExpansion() {
    setExpand((ex) => !ex);
  }
  const btnStyle = {
    border: "none",
    color: buttonColor,
    backgroundColor: "transparent",
    fontSize: "18px",
    marginLeft: "5px",
    cursor: "pointer",
  };

  return (
    <div className={className}>
      {expand ? children : result + ".."}
      <button style={btnStyle} onClick={handleExpansion}>
        {expand ? collapseButtonText : expandButtonText}
      </button>
    </div>
  );
}
