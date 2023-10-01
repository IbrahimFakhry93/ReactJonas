import './index.css'
import { useState } from 'react';

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "charger", quantity: 12, packed: true },
// ];

export default function App() {

  //! the state and the logic that updating that state
  //! both should be in same component
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems(items => [...items, item]);  //* use spread operator to create new array rather than push inside original state, don't mutate state directly
   
    //* The reason for using a callback function here inside setItems
    //* is to ensure that you always have the most recent state when updating it.
    //* and the new state depends on the current state,


   //* The reason why item is defined inside setItems callback, is because of how JavaScript handles function scopes and closures.
   //* When you define a function inside another function (like you’re doing here), 
   //* the inner function has access to the variables in the outer function’s scope.
   //* This includes parameters of the outer function, like item in this case.
    
  }

  return (

  <div className='app'>
    <Logo />
    <Form onAddItems={handleAddItems} />
    <PackingList items={items} />
    <Stats/>
  </div>
  )
}


function Logo(){
  return ( <h1>🌴 Far Away 💼</h1>)
}

//! Form component function is responsible for updating the state
function Form({onAddItems}){
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  
  function handleEvent(e) {
    e.preventDefault();

    //* to prevent form to be submitted if the input item field is empty
    if (!description) return;
    
    const newItem = { description, quantity, packed: false, id: Date.now() }
    console.log(newItem);

    onAddItems(newItem);
    
    //* reset the form input fields after submit
    setDescription('');
    setQuantity(1);

  }
//! note: e.target.value is always string
  return (
    <form className='add-form' onSubmit={handleEvent}>
      <h3> What are you going to pack for you travel? ✈</h3>
      <select value={quantity} onChange={e=>setQuantity(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map(num => <option value={num} key={num}>{num}</option>)}
      </select>
      <input type='text' placeholder='item' value={description} onChange={e=>setDescription(e.target.value)} />
      <button>add</button>
    </form>  
      )

}
function PackingList({items}){
  return (
  <div className='list'>
    <ul>
      {items.map(item => <Item item={item} key={item.id}/>)}
    </ul>
  </div> )
}

function Item({ item }) {
  return (
    <li style={item.packed ? {textDecoration:'line-through'}:{}} >
      <span>{item.quantity} {item.description}</span>
       <button>❌</button>
    </li> 
  )
}
function Stats(){
  return (
  <footer className='stats'>
    <em>
      You have X items on your list and you have already packed X (X%) 💼
    </em>
  </footer>
  )
}


