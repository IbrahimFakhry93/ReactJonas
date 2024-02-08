import { useState } from "react";

//&  Section 11: How React Works Behind the Scenes

//! This App learning objective is:
//~ 1) The case of same position, same element:

//? when between two renders

//* if we have the exact same element at the same position in the tree.
//* (in other words ) if after a render, an element at a certain position in the tree is the same as before,
//* the element will be kept in the DOM. And that includes all child elements and more importantly, the components state.

//~ 2) Resetting the state using changing key technique (so when we navigate through tabs, the likes will be reset)

//* by adding key to TabContent component

//~ 3) setStates call are batched in eventhandlers
//* as in handleUndo function in TabContent comp

//~ 4) the state update asynchronous.
//* As in updating the state value (likes) in handleUndo, handleLikes
//* and the solution to use callback function to update the state.

//~ 5) automatic batching now works in React 18 even outside of event handlers.
//* such as using setTimeout as in handleUndoLater function

const content = [
  {
    summary: "React is a library for building UIs",
    details:
      "Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "State management is like giving state a home",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "We can think of props as the component API",
    details:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

export default function App() {
  return (
    <div>
      <Tabbed content={content} />
    </div>
  );
}

function Tabbed({ content }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="tabs">
        <Tab num={0} activeTab={activeTab} onActive={setActiveTab} />
        <Tab num={1} activeTab={activeTab} onActive={setActiveTab} />
        <Tab num={2} activeTab={activeTab} onActive={setActiveTab} />
        <Tab num={3} activeTab={activeTab} onActive={setActiveTab} />
      </div>

      {activeTab <= 2 ? (
        <TabContent
          item={content.at(activeTab)}
          key={content.at(activeTab).summary}
        />
      ) : (
        <DifferentContent />
      )}
    </div>
  );
}

function Tab({ num, activeTab, onActive }) {
  return (
    <button
      className={activeTab === num ? "tab active" : "tab"}
      onClick={() => onActive(num)}
    >
      Tab {num + 1}
    </button>
  );
}

function TabContent({ item }) {
  const [showDetails, setShowDetails] = useState(true);
  const [likes, setLikes] = useState(0);

  //* So each time we click (like button) the component function gets rendered,
  //* and so then the console.log is executed. This's way of proving that rendering is calling the component function.

  console.log("Render");
  function handleInc() {
    setLikes((likes) => likes + 1);
  }

  function handleTripleInc() {
    //* let's say the initial value of like is 0
    setLikes(likes + 1); //* likes = 0 + 1
    console.log(likes); //* still 0 , stale state, we can't get access to the new updated value of likes which it should be one
    setLikes(likes + 1); //* also likes = 0 + 1
    setLikes(likes + 1); //* also likes = 0 + 1
    //* this handling of likes as above, will only render one like
    //*===============================

    //~ solution: to update the likes triple on one click
    //* use callback function to update the state based on the previous state value
    //* safe guarded approach
    setLikes((likes) => likes + 1);
    setLikes((likes) => likes + 1);
    setLikes((likes) => likes + 1);

    //~ or simply
    setLikes((likes) => likes + 3);
  }

  function handleUndo() {
    //* when you click (undo button), only one log will console, because the set States () are batched
    setShowDetails(false);
    setLikes(0);
    console.log(likes); //* if there are number of likes before Undo (ex. 5), and we click Undo, also likes will console (5)
    //! why?
    //* because doesn't update during re-rendering not immediately after calling handleUndo function when we click its button undo

    //* if we click undo button again, this console.log("Render") won't appear in the console, because already two states values (showDetails, likes)
    //* already are in their default, so the states won't be updated so the component (tabContent) won't be ure-rendered, means it won't be called
  }

  function handleUndoLater() {
    setTimeout(handleUndo, 2000);
  }

  return (
    <div className="tab-content">
      <h4>{item.summary}</h4>
      {showDetails && <p>{item.details}</p>}

      <div className="tab-actions">
        <button onClick={() => setShowDetails((h) => !h)}>
          {showDetails ? "Hide" : "Show"} details
        </button>

        <div className="hearts-counter">
          <span>{likes} ❤️</span>
          <button onClick={handleInc}>+</button>
          <button onClick={handleTripleInc}>+++</button>
        </div>
      </div>

      <div className="tab-undo">
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleUndoLater}>Undo in 2s</button>
      </div>
    </div>
  );
}

function DifferentContent() {
  return (
    <div className="tab-content">
      <h4>I'm a DIFFERENT tab, so I reset state 💣💥</h4>
    </div>
  );
}
