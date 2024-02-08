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
];

export default function App() {
  const [friendsList, setFriendsList] = useState(initialFriends);

  const [showAddFriend, setShowAddFriend] = useState(false);

  const [selectedFriend, setSelectedFriend] = useState(null);

  //& Adding a new object to array of objects by spread operator
  function handleAddFriend(friend) {
    //? to achieve immutability for the  state array (friendsList)
    //! instead of using push method which will mutate the original state array
    //* create new array by []
    //* spread all the original array elements by ... inside the new array bracket [...]
    //* add the new element (friend) by this:  [...friendsList, friend]
    setFriendsList((friendsList) => [...friendsList, friend]);
    setShowAddFriend(false);
  }

  //& toggle a display of a piece of UI
  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  //& select a single list member and handle the double click on it
  function handleFriendSelection(friend) {
    //* note the argument passed to the arrow call back function is the current state(automatically passed to state setter function)
    //* the first condition this:  curSelectedFriend?.id === friend.id  to achieve the feature if I click on the same button again the split form closed
    //! before thinking about this condition, setting selected friend was simply like that setSelectedFriend(friend);
    setSelectedFriend((curSelectedFriend) =>
      curSelectedFriend?.id === friend.id ? null : friend
    );
    setShowAddFriend(false);
  }

  //& Overwriting and updating object property (balance)
  function handleSplitBill(oweValue) {
    //* you don't have to pass object here, because we already selected the object (selectedFriend)
    //* when we clicked on select button in friend component.

    setFriendsList(
      friendsList.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + oweValue }
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

//& using object property to activate selection by set class style (selected)
//& produce boolean value for conditional style setting and content setting by
//& comparing values of state or prop (selectedFriend) and the object of the list member
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

//& Setting a random value for id for every added object (friend)
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

//& Prevent overpayment
function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState(""); //* we use empty strings because they are text input elements
  const [myExpense, setMyExpense] = useState("");
  const friendExpense = bill ? bill - myExpense : ""; //* check first the value of the bill
  const [payer, setPayer] = useState("user"); //* put the default value, the default value of options (user === you), look down the option tag

  //* put the handle submit function inside the same component where the submitted form is located
  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !myExpense) return;
    const oweValue = payer === "user" ? friendExpense : -myExpense;
    onSplitBill(oweValue);

    //? or directly:
    //* onSplitBill(payer === "user" ? friendExpense : -myExpense);
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
          //! Preventing Overpayment:
          //* The Number(e.target.value) > bill ? myExpense : Number(e.target.value) line ensures that a user cannot enter an expense that is greater than the total bill.
          setMyExpense(
            Number(e.target.value) > bill ? myExpense : Number(e.target.value)
          )
        }
      />

      <label>🧑‍🤝‍🧑 {selectedFriend.name}'s Expense</label>
      <input type="text" disabled value={friendExpense} />
      <label>🤑 Who is paying the bill</label>
      <select value={payer} onChange={(e) => setPayer(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}

//*===========================================================================================================================================================
