//& Form Submit

function Form() {
  function handleEvent(e) {
    e.preventDefault();
  }

  //*     <form className='add-form' onSubmit={handleEvent}>
  //! or:
  //*     <form className='add-form' onSubmit={e=>handleEvent(e)}>

  return (
    <form className="add-form" onSubmit={handleEvent}>
      <h3> What are you going to pack for you travel? ✈</h3>
      <select>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input type="text" placeholder="item" />
      <button>add</button>
    </form>
  );

  //* Or apply Form submit by button onClick
  //   <form className='add-form' >
  //   <h3> What are you going to pack for you travel? ✈</h3>
  //   <select>
  //     {Array.from({ length: 20 }, (_, i) => i + 1).map(num => <option value={num} key={num}>{num}</option>)}
  //   </select>
  //   <input type='text' placeholder='item' />
  //   <button onClick={handleEvent}>add</button>  //! But the form won't be submitted by enter key
  // </form>
}

//*=====================================================================================================================================

//! "What do we call an input element that is completely synchronised with state?",
//*  "Controlled element"

//&  Title: Controlled Elements in React.js

//? Note:
//* By default, input fields like 'input' and 'select' maintain their own state inside the DOM.
//* This makes it hard to read their values and leaves the state in the DOM, which is not ideal.

//* In React, we prefer to keep all state in one central place, not inside the DOM.
//* To achieve this, we use a technique called 'Controlled Elements'.
//* With this technique, React controls and owns the state of these input fields, not the DOM.

//* To keep this data inside the application, we need some state because form data changes over time.
//* We also want to keep our application in sync with it.

//? Here are the steps to create a controlled element:

//~ Step 1: Create a piece of state
//* const [description, setDescription] = useState('');

//~ Step 2: Use that state as a value of the input field
//* <input type="text" value={description} />

//~ Step 3: Update that state variable when the input field changes
//* <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />

//? Now, React is in charge of the state and the entire element, hence the term 'Controlled Element'.

//! note: e.target.value is always string

//*=====================================================================================================================================

//! important interview Question
//& What is the difference between states and props:
//* check the slide
//* props read only means it can't be modified by the receiving child component

//* change in state, rerender the UI of the parent component (owning state)
//! and also rerender the receiving child component that received the state as a prop

//*=====================================================================================================================================

//& Title: Controlled Element

//* A controlled element is an element whose value is controlled by React state.
//* This means that the value of the element is always synchronized with the state.

//? Characteristics of a Controlled Element:
//* 1. The element's value is defined by some state as this:
//! const [stateValue, setStateValue] = useState('');
//! <input type="text" value={stateValue} />
//* 2. The element has an event handler that listens for changes.
//* 3. The event handler updates the state accordingly when the element's value changes.
//! <input type="text" value={stateValue} onChange={(e) => setStateValue(e.target.value)} />

//~ Example:
//* const [value, setValue] = useState('');
//* <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
