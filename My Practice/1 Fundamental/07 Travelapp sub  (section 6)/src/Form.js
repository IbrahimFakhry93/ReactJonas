import { useState } from "react";

//! Form component function is responsible for updating the state
export default function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleEvent(e) {
    e.preventDefault();

    //* to prevent form to be submitted if the input item field is empty
    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    onAddItems(newItem); //* this method is recieved by props

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
