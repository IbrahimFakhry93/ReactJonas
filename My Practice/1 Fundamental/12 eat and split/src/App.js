import { useState } from "react";
import "./index.css";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

//! look for another solution for showformaddfriend in the final solution of Jonas

//& App Component:
//* FriendList
//* Button
//* FormAddFriend
//* FormSplitBill

//&  Section 11: How React Works Behind the Scenes
//* we basically need to make each component instance of (FormSplitBill) unique
//* so that each time that it is rendered with a new selectedFriend, React will see this
//* as a completely new component instance.
//* the way we do that is by providing a key that will actually change across the re-renders.
//* So here we can use the selectedFriend.id.

// {selectedFriend && (
//   <FormSplitBill
//     selectedFriend={selectedFriend}
//     onSplitBill={handleSplitBill}
//     key={selectedFriend.id}
//   />
// )}

export default function App() {
  const [friendsList, setFriendsList] = useState(initialFriends);

  //* Something should change in the UI as we click the button
  //* Or in other words, the UI needs to be re-rendered as a result of the event of clicking that button.
  //* And so that is a very good sign  that we need a new state variable (showAddFriend, selectedFriend)
  const [showAddFriend, setShowAddFriend] = useState(false);

  const [selectedFriend, setSelectedFriend] = useState(null);

  //~ Handlers Function:
  //* Create the handler functions right in the component that actually owns that state.
  //* So a function that we will then be passed down via props

  function handleAddFriend(friend) {
    console.log(friend);

    //? to achieve immutability for the  state array (friendsList)
    //! instead of using push method which will mutate the original state array
    //* create new array by []
    //* spread all the original array elements by ... inside the new array bracket [...]
    //* add the new element (friend) by this:  [...friendsList, friend]
    setFriendsList((friendsList) => [...friendsList, friend]);
    setShowAddFriend(false);
  }

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  function handleFriendSelection(friend) {
    // setSelectedFriend(friend);

    //* note the argument passed to the arrow call back function is the current state(automatically passed to state setter function)

    //* the first condition this:  curSelectedFriend?.id === friend.id  to achieve the feature if I click on the same button again the split form closed
    setSelectedFriend((curSelectedFriend) =>
      curSelectedFriend?.id === friend.id ? null : friend
    );

    setShowAddFriend(false);
    console.log(friend);
  }

  function handleSplitBill(oweValue) {
    //* you don't have to pass object here, because we already selected the object (selectedFriend)
    //* when we clicked on select button in friend component.

    setFriendsList(
      friendsList.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + oweValue } //* update the balance
          : friend
      )
    );
    setSelectedFriend(null);
  }

  //! JSX
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friendsList={friendsList}
          onFriendSelection={handleFriendSelection}
          selectedFriend={selectedFriend}
        />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        {/* here the onClick is the name of the prop  */}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
          key={selectedFriend.id}
        />
      )}
    </div>
  );
}

//& Button Component

//* Button component here doesn't have the onclick property, right?
//* Only the native HTML elements, the actual button element <button></button>, does have the onclick property.

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

//& FriendList Component
function FriendsList({ friendsList, onFriendSelection, selectedFriend }) {
  return (
    <ul>
      {friendsList.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onFriendSelection={onFriendSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

//~ Friend Child Component

function Friend({ friend, onFriendSelection, selectedFriend }) {
  console.log(selectedFriend);
  //* use optional chaining so when click on the same button again, selectedFriend will be null
  //* so in null you can't read (id property)
  //* friend will be always exist so no need for optional chaining
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt="person" />
      <h3>{friend.name}</h3>

      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {friend.balance}€
        </p>
      )}
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}€
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      {/* Check button Component Above */}
      <Button onClick={() => onFriendSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

//& FormAddFriend Component:

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();
    console.log("submit");
    if (!name || !image) return;
    const id = Math.floor(Math.random() * 900000) + 100000;
    //? or to create random (id):
    //* const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?u=${id}`,
      balance: 0,
    };
    console.log(newFriend);
    //* Pass the new created object friend to the function will update the state array (friend list)
    onAddFriend(newFriend);

    //? reset the input fields
    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  //* The first step is to get the value of the input fields into our application.
  //* This is done in this component (FormAddFriend)

  //! How do we do that?
  //* We use controlled elements where we have one piece of state for each of the inputs (name,img).
  //* As the user types something here, the value of the input field will be synced with that state.

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🧑‍🤝‍🧑Friend Name</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
      />
      <label>🌄 Img URL</label>
      <input
        value={image}
        onChange={(e) => setImage(e.target.value)}
        type="text"
      />
      <Button>Add</Button>
    </form>
  );
}

//& FormSplitBill Component:

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState(""); //* we use empty strings because they are text input elements
  const [myExpense, setMyExpense] = useState("");
  const friendExpense = bill ? bill - myExpense : ""; //* check first the value of the bill
  const [payer, setpayer] = useState("user"); //* put the default value, the default value of options (user === you), look down the option tag

  //* put the handle submit function inside the same component where the submitted form is located
  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !myExpense) return;
    const oweValue = payer === "user" ? friendExpense : -myExpense;
    onSplitBill(oweValue);
  }
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>split bill with {selectedFriend.name}</h2>
      <label>💰 Bill Value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>🕴️ Your Expense</label>
      <input
        type="text"
        value={myExpense}
        onChange={(e) =>
          //* to avoid enter a value in the expense to be above the required bill, no one pays more than the required bill😄
          //* if the entered value e.target.value > bill so the state value will remain the same last value (myExpense)
          //* if not the state value will equal the Number(e.target.value)
          //? in another words
          //!Preventing Overpayment:
          //* The Number(e.target.value) > bill ? myExpense : Number(e.target.value) line ensures that a user cannot enter an expense that is greater than the total bill.
          setMyExpense(
            Number(e.target.value) > bill ? myExpense : Number(e.target.value)
          )
        }
      />

      <label>🧑‍🤝‍🧑 {selectedFriend.name}'s Expense</label>
      <input type="text" disabled value={friendExpense} />
      <label>🤑 Who is paying the bill</label>
      <select value={payer} onChange={(e) => setpayer(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}

//*===========================================================================================================================================================

//& Title: Understanding React's useState Hook

//~ When you use the useState hook in React, it returns a pair: the current state value and a function to update it.

//? 1. React schedules an update:
//* When you call the setter function from useState,
//* React schedules an update to re-render your component.

//? 2. React prepares to update the state:
//* Before it starts re-rendering, React prepares to update the state.
//* If you passed a callback function to the setter function,
//* React calls this function with the current state value as an argument.

//? 3. Callback function computes the new state:
//* The callback function should compute the new state value based on the current state and return it.
//* This is useful when the new state depends on the previous state, like when you're incrementing a counter.

//? 4. React updates the state:
//* React takes the value returned by the callback function and sets it as the new state.

//? 5. React re-renders the component:
//* Now that the state has been updated,
//* React proceeds to re-render your component (and potentially its child components) with the new state.

//~ Note:
//* This mechanism allows for efficient updates and predictable behavior,
//* as the state update and the subsequent re-render are managed by React in a consistent and optimized manner.
//* It also allows for state updates to be asynchronous, as React may batch multiple updates together for performance reasons.
