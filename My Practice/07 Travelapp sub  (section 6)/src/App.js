import Form from "./Form";
import Logo from "./Logo";
import PackingList from "./PackingList";
import Stats from "./Stats";
import "./index.css";
import { useState } from "react";

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
    //* item here is the resulted object (new item) from the form submittion in the Form component
    //! check Form Copmponent
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
