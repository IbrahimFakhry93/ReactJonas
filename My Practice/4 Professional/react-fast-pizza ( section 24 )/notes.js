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

//! 315. Modeling the "Cart" State
