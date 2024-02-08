import { useState } from "react";
const content = [
  {
    summary: "React is a library for building UIs",
    details: "Dolor in reprehenderit in voluptate velit.",
  },
  {
    summary: "State management is like giving state a home",
    details: "Lorem ipsum dolor sit amet, consectetur adipisicing eli.",
  },
  {
    summary: "We can think of props as the component API",
    details: "Ut enim ad minim veniam, quis nostrud exercitation.",
  },
];

export default function App() {
  return (
    <div>
      <Tabbed content={content} />
    </div>
  );
}

//*===========================================================================
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

//*===========================================================================
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
//*===========================================================================
function TabContent({ item }) {
  const [showDetails, setShowDetails] = useState(true);
  const [likes, setLikes] = useState(0);

  function handleInc() {
    setLikes((likes) => likes + 1);
  }

  function handleTripleInc() {
    setLikes((likes) => likes + 1);
    setLikes((likes) => likes + 1);
    setLikes((likes) => likes + 1);
  }

  function handleUndo() {
    setShowDetails(false);
    setLikes(0);
  }

  function handleUndoLater() {
    setShowDetails(false);
    setLikes(0);
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
//*===========================================================================
function DifferentContent() {
  return (
    <div className="tab-content">
      <h4>I'm a DIFFERENT tab, so I reset state 💣💥</h4>
    </div>
  );
}
//*===========================================================================
