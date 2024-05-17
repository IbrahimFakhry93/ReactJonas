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
//* particularly in the form to update the name using this action creator (updateName).
//* We also export default, the 'userSlice.reducer'.

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
//* using the action creator (updateName) that was automatically created by the create slice function.

//? Updating User State
//* One of the requirements of the application is that the user needs to input their name
//* before starting to use the application.
//* Therefore, we have a form where we can start typing a name.
//* As soon as something is there, we can click on a button.
//* When we click, we want to update the username in Redux, and then navigate right to the pizza menu.

//? Local Username State
//* We have a local username state because this input field is a regular controlled element.
//* We always read the value from username and each time we type a new character, we update that state.
//* We temporarily store the username right in the component itself
//* because it is a bad practice to connect an input field directly to the Redux store.

//? Updating Redux Store
//* We should update a local state variable and not always update the Redux store as we type a new input.
//* i.e not dispatching an action as we type
//* Instead, we should only do that as soon as we actually submit this form,
//* i.e., as soon as we are done inputting the username. This happens in the handleSubmit function.

//? Dispatching an Action
//* To update the store, we dispatch an action.
//* We get access to the dispatch function by using the useDispatch hook provided by React Redux.
//* We need to pass in the updateName function the username
//* because this username will then become the action.payload which will then become assigned to state.username.
//* As soon as that happens, the entire application will re-render and display that username everywhere.

//^ open Home.jsx

//* use global state (userName) for conditionally rendering createUser comp
//^===============================

//* reuse username in different components
//? open Cart - CreateOrder

//* defaultValue={username}: normal html element that adds default value to the input field but still can change it

//^======================

//* next up it's time to start working on the cart global state.

//* to make the application work

//*=============================================================================
//! Title: 315. Modeling the "Cart" State

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

//^ Cart Functionality in User Interface

//? Location of Implementation
//* The cart functionality is implemented in the user interface.

//? User Interaction
//* Users can add new pizzas to the cart by clicking on specific buttons in the user interface.

//? Menu Items
//* The functionality is implemented within the menu items section of the code.

//? Intersection of Cart and Menu
//* The cart and menu features intersect at certain points in the code.
//* Some cart functionality needs to be implemented within the item section of the menu feature.

//? Complexity in Real-world Applications
//* In real-world applications, features are not always linear or isolated.
//* Sometimes, parts of one feature (like the cart) need to be implemented within another feature (like the menu).
//* This is due to the intersection of features in complex applications.

//*===========================================================================================

//! 317. Building the Cart Overview With Redux Selectors

//^ open: CartOverview.jsx  - cartSlice

//? Building the Current Overview Component
//* We're going to select the current state and compute the number of pizzas in the cart and the total price.

//? Using the useSelector Hook
//* We use the useSelector hook to read some state from the Redux store.
//* We pass a selector function to this hook.

//? Writing a Complex Selector
//* This time, we're writing a more complex selector.
//* This function receives the state, reads state.cart.cart,
//* and calculates the number of pizzas in the cart using the reduce method.

//? Total Cart Quantity
//* We call the result of this operation the total cart quantity.
//* Redux recommends doing this kind of data manipulation right inside the selector function and not in a component.

//? Checking the Result
//* After checking the result, we find that we have four pizzas in the cart.
//* We start with two because we have two Mediterranean pizzas in the default cart.

//? Moving the Selector Function
//* Redux recommends moving this selector function into the cart slice file.
//* We export this function and give it a name: get total cart price.

//? Importing the Selector Function
//* We then import this function into our component and check that it works.

//? Calculating the Total Price
//* We write another selector function to calculate the total price.
//* This function is similar to the previous one but changes item.quantity to item.totalprice.

//? Performance Considerations
//* Having these selector functions might cause performance issues in larger applications.
//* If you're serious about Redux, you can look into the Reselect library to optimize these selectors.

//? Displaying the Total Cart Price
//* We use a helper function called format currency to display the total cart price.
//* As we add more pizzas, the price increases.

//? Handling an Empty Cart
//* If there are no pizzas in our cart, we shouldn't display the cart overview.
//* If there is no total cart quantity, this component returns null.

//? Moving to the Cart Page
//* As we move to our actual cart page, we still have a problem.
//* We're not yet using the cart from the state. We'll fix that in the next video.

//*=================================================================================================

//! 318. Building the Cart Page

//^ open: Cart.jsx - cartSlice.js  EmptyCart.jsx
//*=================================================================================================

//! 319. Deleting Cart Items

//^ open: CartItem -  DeleteItem  - MenuItem - CartSlice

// So, we can see that actually by updating the cart state here

// not the entire application is re-rendered

// but really only this one component.

// And so that's because of the internal optimizations

// that Redux has now, all right?

//*================================================

//! 320. Updating Cart Quantities

//^ open: UpdateItemsQuantity  - Button - cartSlice - MenuItems

//*================================================
//! 321. Using the Cart for New Orders

//^ open: CreateOrder.jsx

//*  use the cart data to submit a new order.

// that is pretty easy now

// 'cause all we have to do is to go to that component (createOrder)

// and then select the entire cart

// and then use that to submit the order,

// because the rest of the logic

// has already been written before.

//^^===========

//* after you place an order,
//* then your cart gets automatically emptied out.

// And so let's implement that here as well,

// even though it is not going to be super easy.

// So we will have to use some kind of hack here again

// because clearly the dispatching of the clear cart action

// will need to happen right here inside this form action.

// However, for dispatching,

// we need to call the use dispatch hook,

// which is only available in components

// and not in a regular function like this one.

// So the hack that we can use

// and which we should really, really not overuse

// is to directly import the store object here

// into this function and then dispatch directly on that store.

// So let me show you what I mean by that.

// But really don't overuse this technique

// because it deactivates a couple of performance optimizations

// of Redux on this page.

// So do not overuse.

//^=================================================
// But now what about the priority price?
// But now what about the priority price?

// So how do we calculate this?

// So basically whenever we click here,

// we then want to update the price

// and we want to update it by exactly 20%

// of this total cart price,

// 'cause from the list of requirements,

// that is the price of making the order priority.

// So if we want to change the UI whenever this here changes,

// so whenever we click here,

// that means that we need some state, right?

// So basically we need a reactive value.

// And so that's why here we actually already have that.

// Let me place that at the very top right here.

// And then let's also use this here.

// So now we are making

// this checkbox here a controlled element again.

// Okay.

// And so then we can use that reactive value,

// so that piece of state, here to compute the priority price.

// So in case we are with priority,

// then the price should be the total cart price times 0.2,

// and otherwise just zero.

// Yeah. Nice.

// So let's input a phone number, then this, placing our order,

// and with this we are done.

// Or actually, we are not really done,

// because we did select priority, but it is not here.

// So something strange happened,

// but I think I know the reason.

// I think it is because we changed now the value.

// So here in this checkbox,

// now the value will no longer be on and off.

// So where is that?

// Here.

// So again here, the value will now no longer be

// on like we had here earlier.

// So here we were checking if that value is on,

// but instead now it will be true.

// So true as a string. All right.

// So no longer just on, but really true or false.

// And so here we then want to give this order priority

// in case that the data that we receive is equal

// to the string of "true".

// So let's try that again.

// So I said initially that this was gonna be a short

// and easy video, but well, there's always a lot to do.

// So let's try again.

// Let's give ourselves priority again.

// Well, let's wait for it.

// Nice. So now that worked.

// And so now indeed we are finished,

// at least with what we set out to do in this video

// because the list of requirements

// of this app still has, I think,

// one or two things that we should implement.

// And so let's get to that for the rest of this section.
//*===========================================================

//! 322. Redux Thunks With createAsyncThunk

//^ open:  userSlice - apiGeocoding -createOrder

// more advanced Redux Toolkit

// and in particular, we will now create a Thunk middleware

// by using the built-in CreateAsyncThunk function

// which is a way of creating a Thunk

// that we avoided when we first learned about Redux,

// and the idea here is to implement the feature

// where our users can use geolocation

// in order to get their GPS position and their address.

//^===

// let's analyze what we have here.

// So we have dysfunction here called fetchAddress

// which, as the name says,

// is responsible for fetching some information

// about the user's address

// and it does so in two steps.

// So first of all, it gets the user's geolocation position

// which is provided by this getPosition function right here.

// So basically wrapping a promise

// around this function right here.

// So then we can use await.

// So here we get the user's position

// and then with that position, so that latitude and longitude,

// we use this reverse geocoding API.

// So this one right here, let's open that,

// and so here all we do is to make a fetch request

// to this API right here

// with the user's current latitude and longitude.

// And so this will then do reverse geocoding

// which is basically getting some information

// about that GPS position like the city or the street name.

// So things like that,

// and so then we can display that information

// later in the form.

// So basically what we will want to do,

// so let's just go back to our order form.

// And so the idea here will be to be

// that we have a button here where the user

// can request their geolocation position

// and then this filter

// will automatically be filled with their address,

// and so that address will come here from this API.

// So then here we create a nice string

// based on the information received there

// and then we return an object,

// both with the GPS position and the address string.
//^=============================

// but as we can see,

// this is an async function

// which means that we cannot just call this function

// directly inside a Redux reducer

// because remember Redux is by nature completely synchronous,

// and so that's why we now need to talk about Thunks again.

// So we learned all about Thunks back in the Redux section

// which you can of course revisit and review,

// but basically all you need to know at this point

// is that a Thunk is a middleware

// that sits between the dispatching

// and the reducer itself.

// So it will do something to the dispatched action

// before actually updating the store.

// Now back then when we wanted

// to use Thunks with Redux Toolkit,

// we manually created our own action creator

// and placed the Thunk in there

// so instead of using Redux Toolkit's

// native way of creating a Thunk,

// but now let's actually do that.

// And so now in order to create a Thunk,

// we will use the createAsyncThunk function.
// let's create again fetchAddress

// because we will now again, remove that one,

// and so this fetch address will be the result

// of calling createAsyncThunk.

// And so this createAsyncThunk receives two things.

// First, we need to pass in the action name,

// so that's gonna be user and then fetchAddress

// and then second, we need to pass in an async function

// that will return the payload for the reducer later.

// So this function needs to return the promise

// and so an async function is ideal here.

// So let's just create an anonymous function here

// and then grab all this code

// and place that in there.

// So then we can remove this

// and paste that here.

// All right, and now this fetchAddress here

// will actually become the action creator function

// that we will later call in or code,

// and so let's export this one as well.

// So now besides this updateName action creator,

// we also have this new one here which is fetchAddress

// and we should not call it something like getAddress

// because those names are reserved for selectors.

// So by convention, these names for the AsyncThunks

// should not be called something with get, okay?

// Now this is I guess pretty confusing,

// so let's just quickly recap what we did here.

// So this time we used the Redux Toolkit way

// of creating a Thunk function.

// So we called this function right here

// where we passed in the action type name

// and so that's this one right here

// which we will never manually use,

// but still Redux needs this internally.

// And then as a second argument,

// we pass in the actual Thunk function,

// so the code that we want to execute

// as soon as this action here will be dispatched.

// Now what's special about this is that this createAsyncThunk

// will basically produce three additional action types.

// So one for depending promise state,

// one for the fulfilled state,

// and one for the rejected state.

// And so now we need to handle these cases

// separately back in our reducers

// and so this is how we then connect this Thunk

// with our reducers down here.

// So let's do that

// and here the syntax is actually pretty confusing again.

// So here we need to now specify these extra reducers

// which will then get something called a builder.

// So this is basically a function here

// and then on this builder we call addCase.

// So again, pretty confusing here,

// but this is just the way Redux Toolkit works

// and it's the reason why I didn't show you this earlier.

// But anyway, here now let's use

// that function that we just created, so that fetchAddress,

// and then here we are going to handle the pending state.

// So .pending, and then here is where the actual reducer

// finally comes into play.

// So here we can now get the state and the action again

// and so here what we will want to do is to update the state

// by setting the status to loading.

// Okay, and so let's actually now update

// also our initial state.

// So besides this username,

// we now need a few more things here.

// So let's start with a status

// and let's make it by default idle.

// And then as soon as we start loading,

// so that's this pending state,

// we set it to loading right here.

// Just place this into these curly braces

// and then we also want to store the user's position.

// Let's start here with this empty object, the address,

// and also some possible error.

// Okay, and so let's now handle the other two cases.

// So for the fulfilled state,

// so the case when there is success,

// and also the rejected state for an error.

// So builder.addCase fetchAddress.fulfilled

// and then again, finally our reducer.

// So state and action

// and here we have this small problem

// where actually we need to change this here

// after the other at case.

// So first of all, let's set the status then back to idle

// and here I'm again forgetting this dot here.

// Then let's actually take care of the important part.

// So as I mentioned earlier,

// this data that we return here

// will become the payload of the fulfilled state.

// So payload of the fulfilled state.

// All right, and so let's then use that.

// So let's do state.position

// will be equal to the action.payload.position

// and then state.address will be

// equal to action.payload.address.

// And finally, let's add a case for a possible error.

// So for example, when the user doesn't accept geolocation,

// so state and action maintained here.

// Let's do state.status will be an error

// and not like this, and state.error.

// So here we will then also have an error string

// which actually gets automatically placed on the action.

// So action.error.message.

// Now okay, so we actually finished this part here.

// But before we review this to make this a bit less confusing,

// let's quickly add just a temporary button right here

// in this create order so that we can dispatch an action

// and then actually see this working.

// So let's create a button here

// with the onClick handler

// where we then put this patch.

// And so let's actually get that.

// I think we don't have it yet.

// Let's just do that somewhere here.

// So use dispatch, and so here what we want to dispatch

// is exactly this action creator.

// So we want to dispatch an action that is created

// by this action creator that we just made here

// and so that will then basically dispatch an action

// with this string here,

// so with this action name and attached the pending state

// and the fulfilled and the rejected state.

// So that's why we exported that

// and so let's see if this works.

// So get position like this,

// but then we need to add some pizza here

// actually to the cart first.

// All right, and now let's actually open up

// our Redux dev tools again.

// So that's gonna be really handy here

// and so let's click here,

// and so something is definitely working.

// So it's asking me here to allow geolocation,

// so let's allow that.

// And you see that a lot of things happened down here,

// so let's check it out.

// So as soon as we clicked here on get position,

// in fact, the user/fetchAddress/pending action

// was dispatched, and so what this did here

// was set the status from idle to loading.

// And so that is actually exactly what we have here,

// so this one right here,

// so that's what I was saying earlier.

// So that dispatching the action

// would create an action

// with a type of user/fetchAddress/pending,

// so exactly what we have here.

// And so that's what this reducer right here

// is then responsible for handling,

// so for updating the state right here.

// And then as soon as the promise was finished,

// so as soon as it got fulfilled after all of this work here,

// so after getting the position and then fetching the address,

// so after all this,

// that data was then returned here from the function.

// And so remember that this then became

// the payload of the fulfilled state

// and so this fulfilled state

// is then handled by this reducer right here.

// And so this then updated the state here to idle,

// to the address itself and to the GPS position.

// And in case the user, for example,

// did not allow the geolocation to happen,

// so if we clicked here on block,

// then this rejected state,

// so this reducer right here would be caught.

// So then we would get an error

// which we could then display in the user interface.

// Now okay, so our Redux logic here works

// even though it is, as I keep saying, pretty confusing.

// But this is basically just a recipe

// that you will have to follow in case you are interested

// in creating thanks with Redux Toolkit.

// So just make sure to maybe review the flow of the data here

// and how all of this works,

// and then let's move on to the next video

// where we will integrate this geoposition logic

// here into this actual form.

//*====================================================================

//! 323. Integrating Geolocation

//* let's finish this feature

// and integrate the geolocation data

// that we just loaded using Redux

// into our create order form.

//^=============
// put getPosition button on top of address input field.
//^======================
// as the last step,

// we, of course, also need to get this data then

// here into our form action.

// So right here in the form action,

// when we submit the new order,

// we will also want to submit it

// with the actual position data,

// so with the user's GPS location,

// because that's going to be really important

// or really helpful for the company

// to deliver the pizza.
//^==============

// However, when the user denies the geolocation

// or if there is some other problem with geolocation,

// then we do not get this position right here.

// But still, we want to allow the user to submit the form

// in that situation,

// so they can still manually input their address here,

{
    /*
  <input
                        type="hidden"
                        name="position"
                        value={
                            position.latitude && position.longitude
                                ? `${position.latitude} , ${position.longitude}`
                                : ''
                        }
                    />
*/
}

//*=========================================================

//! 324. Fetching Data Without Navigation: useFetcher

//^ open: Order.jsx  - OrderItem.jsx
// let's go back to some more advanced features

// of React Router,

// and, in particular,

// let's learn about how we can fetch and mutate data

// without actually causing navigations,

// so without moving to another page.

//^==================================

// So, the page that is already opened right here.

// So, as I said in the beginning,

// sometimes we need to fetch some data from another route,

// so basically data that is not associated

// with this current page right here,

// but we want to do that

// without causing a navigation sometimes.

// So, for example, let's say that here in the order page,

// we wanted to load the menu data again,

// and we already wrote all the logic

// for fetching exactly that data,

// but it is associated to another route.

// So, to the menu route and not to this one,

// but still we want to use it here,

// because there is no point in writing that logic again.

// So, in other words, what we want to do

// is to use the data from the menu route,

// but without the user actually going there.

// And, so, for that, we can use the useFetcher hook.

// So, this hook will return something called a fetcher.
//^===================================

// the idea here is to load the menu data,

// so that we can then associate the ingredients

// to each of the different pizzas.

// and so we can get that data from the menu route.

// So, what we want to do is,

// right after this component (Order) mounts,

// we want to fetch that menu data using our fetcher.

// So, if we want to do this at component mount,

// then let's again use our friend use effect.
//^================
//!  if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu')
// this will then load the data,

// and will store it basically in this fetcher object,

// and then later we can retrieve the data from there

// when we want.

// And, actually, let's only fetch this data

// if there is no data yet.

// So, we can do if there is no fetcher.data.

// And, so let's only start fetching this data

// whenever the fetcher is in the idle state,

//^==================

// just like normal page navigations,
//^ open: AppLayout
// const isLoading = navigation.state === 'loading'

// this fetcher can also be in different states.

//^==================

//? OrderItem:

;<p className="text-stone text-sm capitalize italic">
    {isLoadingIngredients ? 'loading' : ingredients.join(', ')}
</p>
//! problem: this : ingredients.join(', ')} execute because isLoadingIngredients is false although the fetcher is still loading at the beginning

//* because in the very beginning, fetcher.state will be idle,

//~ Solution
//? Order:
;<ul className="dive-stone-200 divide-y border-b border-t">
    {cart.map((item) => (
        <OrderItem
            item={item}
            key={item.pizzaId}
            isLoadingIngredients={fetcher.state === 'loading'}
            ingredients={
                fetcher?.data?.find((el) => el.id === item.pizzaId)
                    ?.ingredients ?? []
            }
        />
    ))}
</ul>
// I'm guessing that the issue is that,

// in the very beginning,

// fetcher.state will be idle,

// but that doesn't mean that we already have our ingredients,

// so that we have our data already.

// And, so in those very first instance,

// here, we will not be loading the data,

// but we also don't have the data yet.

// And, so let's just try to return an empty array

// then in this case.

// So, basically, if this year doesn't exist,

// then we just return an empty array.

// So, that will then fix the problem

//*=========================================================

//!  325. Updating Data Without Navigation

//^ open : order  - UpdateOrder  - App - apiRestaurant

// let's do the same thing, but with writing.

// So with updating data, using a form

// but without causing a new navigation.

// And by doing this,

// we will be able to implement the last feature

// that is still missing from this application

// which is to allow users

// to mark their order as a priority order

// even after the order has already been placed.

//* so create UpdateOrder comp
//^=====================
// now here we have our Make Priority button.

// And so as we click this

// we want to change priority from false to true.

// And then this whole page here should re-render

// and make this button disappear

// and displaying appear the priority status.

// So let's see how we can do that using again

// the usefetcher hook.

// So just like we did in the previous lecture.

// So usefetcher like this.

// And now in order to update, so to write data,

// we do not use fetcher.load,

// but instead we use a form component

// data fetcher provides to us.

// So basically what we will do is to simply

// wrap this button here into a form

// even though we don't have any input elements,

// but still, this is how it works.

//^======================

// And so basically this is just like the other form

// that we worked with earlier.

// So just like this React Router form here (Form in CreateOrder comp)

// with the only difference that submitting this one here ((Form in CreateOrder comp))

// actually creates a new navigation.

// So the idea with this one is to navigate away from the page

// while this one,

// so fetcher.Form will not navigate away,

// it will simply submit a form

// and then also revalidate the page.

//^==============

// let's write the actual logic to update to order.

// And so for that, we need again an action.

// So async function,

// which by default should be called action.

// And so here we again get access to the request

// and to the params,

//^=================

// we need to wire everything up in our route definition. (in App.jsx open it)

// So we need to connect this action with the page.

// So let's come back here to App.js

// where we have our route definitions.

// And so this one,
// import { action as updateOrderAction } from './features/order/UpdateOrder'
// {
//     path: '/order/:orderId',
//     element: <Order />,
//     loader: orderLoader,
//     errorElement: <Error />,
//     action: updateOrderAction,
// },

// we will actually connect to this route right here.

// So action should be,

// then first we need to of course import that.

// So let's do that right here.

// And it is a named import.

// So loader and then let's rename it as updateOrderAction

// from features order, and then UpdateOrder.

// All right, and now here, let's then use that.

// So updateOrderAction.

// And this is going to work just fine

// even though the form that we want to connect

// with this action is not really on this page

// but on a child component of this order page, right?

// So the form that we want to be handled with this action here

// is actually inside UpdateOrder

// which is a child component of order,

// but React Router is smart enough to figure that out

//^=====================

// usually when we do some kind of data updating,

// we will then have a couple of inputs here also in this form.

// But in this case, we don't have any inputs,

// all we have is this button here.

// And so in this case,

// we don't even need to read any data from the request.

// So opposed to what we did here. (in CreateOrder comp)

export async function action({ request }) {
    const formData = await request.formData() //* formData is a web api provided by the browser
    const data = Object.fromEntries(formData)

    //& model the raw data in the action:

    const order = {
        ...data,
        cart: JSON.parse(data.cart),
        // priority: data.priority === 'on',
        //* after convert the input checkbox to controlled element and priority becomes a reactive boolean state
        //* so it is true or false not on or off
        priority: data.priority === 'true',
    }
    //& getting the new order and redirect the url to show the order info page
    // if everything is okay, create new order and redirect it
    //! just comment below and uncomment return null for testing purpose and check console.og(order)
    const newOrder = await createOrder(order)
    //* don't overuse
    store.dispatch(clearCart())
    return redirect(`/order/${newOrder.id}`)
}

// So here we got the request,

// and then we read the data from there,

// which again, in this case is not necessary.

// So we don't even need that request here.

// Let's just leave it there so that you know that it exists.

// So let's get rid of this.

// And what we are going to do now

// is to use one of our services, (in apiRestaurant)

// so this one right here

// and call this function.

// So this updateOrder function.

// And as we see, this is a patch request

// which is one of the two ways of updating data.

// So there is the put request

// where we need to pass in the entire new updated object.

// And then there is patch,

// which will only take in the data that has actually changed

// and add that to the original object on the server.

// So long story short, all we need to pass in here

// in this function is the ID of the order

// that should be updated

// and then only the data that should be updated.

// So the data that should be updated

// is only the priority field,

// and it should always simply be set to true

// because this button is only visible here

// whenever the priority is false.

// So then here we basically just turn that on.

// And so then here, let's await that update order function

// which needs the current ID and that data.

// So where do we get the order ID from?

// Well, luckily for us,

// we also have here this params object

// which is still able to give us the information here

// about the current URL,

// and that contains the order ID param right there.

// So we can simply do params.orderId

// and then the data, and that is actually already it.

// So let's click here now and see what happens.

// So take good notice here of what will happen.

// So let's click and immediately our page updated here.

// So we got now the priority price here

// and we have the priority status also displayed here.

// And so this is the power of re-validation

// that I mentioned earlier.

// So re-validation basically means that React Router knows

// that the data has changed as a result of this action.

// And so then whenever that happens,

// it'll automatically re-fetch the data in the background

// and then re-render the page with that new data.

// And so that is what is so helpful

// about this fetcher form here.

// So this form that we can use to update some data

// without causing a navigation.

// And so just like I mentioned earlier,

// if you are building a highly interactive web application,

// you'll use this all the time probably.

// Now as I had mentioned earlier,

// probably you will then also use some input fields here.

// And if you want, you can now practice this new skill here

// by allowing the user to update some other information,

// for example, their address or their phone number.

//*=========================================================