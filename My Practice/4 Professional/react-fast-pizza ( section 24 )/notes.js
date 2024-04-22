//!  313. Modeling the "User" State With Redux Toolkit

//* The username state is going to be a global UI state.
//* We need this state in many places in the application tree.

//? User State Usage
//* We need the username state in the Header (inside UserName comp), in the CreateUser component
//* CreateUser component is inside Home Component
//* to decide if we want to display (CreateUser comp) and to update the name.
//* We also need the username in the Cart component and in the CreateOrder component.
//* This allows us to automatically pre-populate the first name input field with the username.

//^======================================================

//* npm i @reduxjs/toolkit react-redux

//^======================================================

//^ open: userSlice
//? Creating a Slice of Global UI State
//* We created a slice of our global UI state called 'user' with an initial state.
//* We have a reducer function responsible for updating the state object.
//* Since we are using Redux Toolkit, we can directly mutate this state object and set 'state.username'
//* to the one we receive as soon as we dispatch the action.

//? Exporting Action Creators
//* Inside 'userSlice.actions', we get access to the action creators.
//* We export it as a named export so that we can use it in our application,
//* particularly in the form to update the name using this action creator.
//* We also export default, the 'slice.reducer'.

//^ open: store.js
//? Setting Up Store
//* We use this reducer to set up our store.
//* We create a new file in the top level of the source folder called 'store.js'.

//^ open: main.jsx
//? Connecting Redux to React Application
//* We connect Redux to our React application at the very top of our component tree, inside 'main.jsx'.
//* We provide our global state to the entire app tree using the provider component
//* which is part of the React Redux package.

//^ open: UserName.jsx
//? Accessing State from Redux
//* Our application should now be correctly connected to Redux.
//* To verify this, we go to our UserName component and try to get that state from Redux.
//* We use the 'useSelector' hook provided by React Redux and pass in a selector function
//* that gets the entire state as a parameter. We select only what we want,
//* 'state.user.username', and store it in a variable called 'username'.

//? Rendering Based on Username
//* If there is no username, we don't render that component.
//* If no username, then just 'return null'. So in this case, there is nothing to be displayed there.

//? Setting Username
//* We need a way of setting this username in the first place.
//* We will do that right here in this component in the next video.

//*==================================================================================================================================

//! 314. Reading and Updating the User State

//? Open CreateUser.jsx
//* We're going to update the user state from our application and display that state in multiple places.
//* We update Redux state by dispatching an action to our reducer,
//* using the action creator that was automatically created by the create slice function.

//? Updating User State
//* One of the requirements of the application is that the user needs to input their name before starting to use the application.
//* Therefore, we have a form where we can start typing a name.
//* As soon as something is there, we can click on a button.
//* When we click, we want to update the username in Redux, and then navigate right to the pizza menu.

//? Local Username State
//* We have a local username state because this input field is a regular controlled element.
//* We always read the value from username and each time we type a new character, we update that state.
//* We temporarily store the username right in the component itself
///* because it is a bad practice to connect an input field directly to the Redux store.

//? Updating Redux Store
//* We should update a local state variable and not always update the Redux store as we type a new input.
//* Instead, we should only do that as soon as we actually submit this form,
//* i.e., as soon as we are done inputting the username. This happens in the handleSubmit function.

//? Dispatching an Action
//* To update the store, we dispatch an action.
//* We get access to the dispatch function by using the useDispatch hook provided by React Redux.
//* We need to pass in the updateName function the username
//* because this username will then become the action.payload which will then become assigned to state.username.
//* As soon as that happens, the entire application will re-render and display that username everywhere.

//^===============================

//* reuse username in different components
//? open Cart - CreateOrder

//*    defaultValue={username}: normal html element that adds default value to the input field but still can change it

//^======================

//* next up it's time to start working on the cart global state.

//* to make the application work

//*=============================================================================
//& Title: 315. Modeling the "Cart" State

//? Create: cartSlice.js and open store,js
//* Many of the state management principles learned throughout this course still apply to modeling state in Redux.
//* For example, we should always derive state whenever possible.
//* This is why we are not storing the total cart price here.
//* We could store the total price and maybe even the number of items,
//* but we can easily derive these from the cart array itself.
//* Creating these would just create more problems
//* because then we would have to keep them in sync while updating the cart.

//? Payload Definition
//* The payload is simply what we pass into the action creator when we dispatch an action.

//? Delete Feature and ID
//* When we delete an item, the payload that we will need will be the ID of the item.
//* So basically the pizza ID because that's the name they have here in the cart.
//* When we delete, we will try to find the item with that ID and then delete it.

//? State Mutation
//* Since we are allowed to directly mutate the state,
//* we could use the splice method and directly mutate the array.
//* However, it's a lot easier to still use the filter method like we have been doing all along
//* because it requires a lot less code.
//*===========================================================================================
//!316. Adding Menu Items to the Cart

//* let's start using our cart state by adding new pizzas to the cart.

//? open: MenuItem

// So, where exactly are we going to do that in our code?

// Well, here in the user interface,

// the user is able to add new pizzas to the cart

// simply by clicking here on these buttons.

// And so, all we have to do is to come to the menu items

// and then implement that functionality right there.

// So, here is where the cart

// and the menu features intersect a little bit.

// And so, we now need to implement some cart functionality

// here, in the item.

// But of course, things are never so linear

// in any real-world application.

// So carts cannot be completely separated

// from the menu feature.

// And so, yeah, sometimes we need to implement

// some parts of a feature inside another feature,

// because again, of course, these will intersect.
