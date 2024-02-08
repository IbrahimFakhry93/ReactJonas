// import Form from "./Form";
// import Logo from "./Logo";
// import PackingList from "./PackingList";
// import Stats from "./Stats";
import "./index.css";
import { useState } from "react";
//& Section 6: State, Events, and Forms: Interactive Components
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "charger", quantity: 12, packed: true },
];

export default function App() {
  //! the state and the logic that updating that state
  //! both should be in same component

  //? Empty items to be loaded at first:
  // const [items, setItems] = useState([]);

  //? or load initialItems at first:
  const [items, setItems] = useState(initialItems);

  //! Note:
  //* the following handling functions handleAddItems, handleDeleteItems and handleToggleItem are placed in the App comp
  //* which is the comp where state (items) actually lives.

  function handleAddItems(item) {
    //* item here is the resulted object (new item) from the form submission in the Form component
    //! check Form Component
    setItems((items) => [...items, item]); //* use spread operator to create new array rather than push inside original state, don't mutate state directly

    //* The reason for using a callback function here inside setItems
    //* is to ensure that you always have the most recent state when updating it.
    //* and the new state depends on the current state,

    //* The reason why (item) is defined inside setItems callback, is because of how JavaScript handles function scopes and closures.
    //* When you define a function inside another function (like you’re doing here),
    //* the inner function has access to the variables in the outer function’s scope.
    //* This includes parameters of the outer function, like (item) in this case.
  }

  function handleDeleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    const confirmed = window.confirm("Are sure you want to delete all items?");
    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onClearList={handleClearList}
        onDeleteItems={handleDeleteItems}
        onCheckItems={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}

//*==============================================================================================================================

//! Form component function is responsible for updating the state
function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleEvent(e) {
    e.preventDefault();

    //* to prevent form to be submitted if the input item field is empty
    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    onAddItems(newItem); //* this method is received by props

    //* reset the form input fields after submit
    setDescription("");
    setQuantity(1);
  }
  //! note: e.target.value is always string
  return (
    <form className="add-form" onSubmit={handleEvent}>
      <h3> What are you going to pack for you travel? ✈</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>add</button>
    </form>
  );
}

//*==============================================================================================================================

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}

//*==============================================================================================================================

function PackingList({ items, onDeleteItems, onCheckItems, onClearList }) {
  const [sortBy, setSortby] = useState("input");

  let sortedItems;
  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems?.map((item) => (
          <Item
            item={item}
            onDeleteItems={onDeleteItems}
            onCheckItems={onCheckItems}
            key={item.id}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortby(e.target.value)}>
          <option value="input">Sort by input</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed</option>
        </select>
        <button className="button" onClick={onClearList}>
          Clear List
        </button>
      </div>
    </div>
  );
}

//*==============================================================================================================================
function Item({ item, onDeleteItems, onCheckItems }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onCheckItems(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItems(item.id)}>❌</button>
    </li>
  );
}

//*==============================================================================================================================

function Stats({ items }) {
  //* apply early return
  if (!items)
    return (
      <p>
        <em>Add items to travel</em>
      </p>
    );
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  console.log(numPacked);
  const percentagePack = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentagePack === 100
          ? `Everything is done✈️`
          : `You have ${numItems} items on your list and you have already packed ${numPacked} (${percentagePack}%) 💼`}
      </em>
    </footer>
  );
}

//*==============================================================================================================================
