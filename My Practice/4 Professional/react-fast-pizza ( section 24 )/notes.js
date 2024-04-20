//!  313. Modeling the "User" State With Redux Toolkit

// this user state is going to be global UI state.

// And the reason for that is that we need that state

// in many places in the application tree.

//^============================================================================

// So we are going to need it up there in the header.

// So at least if the app is large enough,

// so we need it right here.

// We also need it for this component here.

// So to decide if we want to display this one here

// and also to then update the name.

// Also, we need the username right here and even right here.

// So then we can automatically pre-populate this input field

// with that username.

//* npm i @reduxjs/toolkit react-redux

//^======================================================
//? open: userSlice

// we created a slice of our global UI state.

// So by using this function here,

// we created a slice called user

// which has this initial state right here.

// And then we have a reducer

// which is this function that is responsible

// for updating the state object.

// So that function, in this case this method here,

// receives the current state and the action.

// And then since we are using Redux Toolkit,

// we can directly mutate this state object

// and then set the "state.username"

// to the one that we receive as soon

// as we're going to dispatch the action.
// So that is then going to be "action.payload",

// but then inside "userSlice.actions",

// we will get access to the action creators.

// And so we then export it here as a named export,

// so that we can then use that here in our application

// and in particular probably here in this form. (input field in Home page)

// So here we will then update the name

// using this action creator

// qnd then we also export default, the "slice.reducer".

// And so let's now actually use this reducer to set

// up or store.

// So let's create a new file right here

// in the top level of the source folder.

// And is, by convention, is just called "store.js".

// then connect redux to React application

//? open: main.jsx

// so we usually do that at the very top

// of our component tree, which is actually inside "main.jsx".

// So we want to provide our global state really

// to the entire app tree.

// And so here we need to now use the provider component

// which is part of the React Redux package.

//? open: UserName.jsx
// So our application should now be correctly connected

// to Redux and to see if it actually is,

// let's come here to our username component.

// And then in here we will try to get that state from Redux.

// And remember that the way we get some state from Redux

// inside a React component is by using the "useSelector" hook.

// So "useSelector" again provided by React Redux,

// and then here we need to pass in a selector function

// and that function gets as a parameter, the entire state.

// And then here we can select only what we want

// so that "state.user.username".

// And then let's of course store that also here

// in a variable called "username",

// that then here we replace that with the username.

// And of course, at this point we won't see anything

// because by default the user is empty.

// So let's just place some name here.

// And then let's see.

// And beautiful.

// So we are getting this state now right from Redux.

// So if we change this here,

// then of course that changes over there as well.

// Nice. Now of course, if there is no username,

// then we don't want to even render that component.

// So let's quickly do that as well.

// So if no username, then just "return null".

// And so in this case,

// then there is nothing to be displayed there.

// Great. So we actually already finished this component,

// but now of course we need a way

// of also setting this username in the first place.

// So that we will do right here in this component.

// And so let's leave that for the next video.

//*==================================================================================================================================

//! 314. Reading and Updating the User State

//? open CreateUser.jsx
// Let's now update

// the user state from our application

// and also display that state in multiple places.

// So do you remember how we update the state inside Redux?

// Well, we update Redux state

// by dispatching an action to our reducer here,

// and we do that by using the action creator

// that was automatically created by the create slice function.
// and we do that by using the action creator

// that was automatically created by the create slice function.

// So in that case,

// that's this update name function

// one of the requirements of the application

// was that the user needs to input their name

// before starting to use the application.

// And so therefore we have this form right here

// where we can start typing a name

// and then as soon as something is there,

// we can click on this button.

// And so as soon as we click here,

// we want to update the username in Redux,

// and then we want to navigate right to the pizza menu.

//^===========================
// so let's just quickly look here

// at the component that we already have

// and we see that we have a local username state.

// And so that's simply because this input field

// is a regular controlled element.

// So we always read the value from username

// and each time we type a new character,

// we update that state.

// And we do it this way, so we are temporarily storing

// the username right in the component itself

// because it is a very bad practice

// to connect an input field right to the Redux store.

// So as we change the username here,

// so as we type a new input here,

// we should really update a local state variable

// and not always update the Redux store.

// Instead, we should only do that

// as soon as we actually submit this form.

// So as soon as we are done inputting the username.

// And so that's here in the handle submit function.

// So this input here and the button

// are inside this form element.
//^==================================================

// in the handle submit function

// where we will then actually update the Redux store

// and then redirect the user to the menu.

//^===================================================
// to update the store.
// we do that by dispatching an action.
// Now the way in which we get access to the dispatch function

// is to use the use dispatch hook

// that is provided by React Redux.

//^============================

// we need to pass in updateName func  the username

// because this username will then become the action.payload

// which will then become assigned to state.username.

// And then as soon as that happens,

// of course, the entire application will re-render

// and display that username everywhere.
//^===============================

//* reuse username in different components
//? open Cart - CreateOrder

//*    defaultValue={username}: normal html element that adds default value to the input field but still can change it

//^======================

// next up it's time to start working on the cart global state.

// And with this, we will be able

// to then, finally, really make the application work

//*=============================================================================

//! 315. Modeling the "Cart" State
