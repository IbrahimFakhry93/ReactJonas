//!  313. Modeling the "User" State With Redux Toolkit
//* we will use Redux for all our global state.
//* So for the user state and for the cart state.

//* And storing global UI state is exactly what Redux was made for.
//* And so it's a great choice for this app.

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
//* Since we are using Redux Toolkit, we can directly mutate this state object 
//* and set 'state.username' to the payload we receive as soon as we dispatch the action.

//? Exporting Action Creators
//* Inside 'userSlice.actions', we get access to the action creators.
//* We export it as a named export so that we can use it in our application,
//* particularly in the form to update the name using this action creator (updateName).
//* We also export default, the 'userSlice.reducer'.
//* We use this reducer to set up our store.

//^ open: store.js
//? Setting Up Store
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

//^ Open CreateUser.jsx
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
//* because this username (the local state in createUser comp) will then become the action.payload which will then become assigned to state.username.
//* As soon as that happens, the entire application will re-render and display that username everywhere.

//^ open: Home.jsx

//* use global state (userName) for conditionally rendering createUser comp
//^===============================

//* reuse username in different components
//^ open Cart - CreateOrder

//* defaultValue={username}: normal html element that adds default value to the input field but still can change it


//*=============================================================================
//~  Next up it's time to start working on the cart global state to make the application work

//! Title: 315. Modeling the "Cart" State

//^ Create: cartSlice.js and open store,js
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

//^ open: MenuItem.jsx

//~ Cart Functionality in User Interface

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

//~ Selector Functions in cartSlice.js to be exported to be used inside useSelector in any component wherever is needed

//? Writing a Complex Selector (getCartTotalQuantity)
//* This time, we're writing a more complex selector.
//* This function getCartTotalQuantity receives the state, reads state.cart.cart,
//* and calculates the number of pizzas in the cart using the reduce method.

//^ in Cart Slice
export const getCartTotalQuantity = (state) =>
    state.cart.cart.reduce((sum, item) => sum + item.quantity, 0)


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
//* This function is similar to the previous one but changes item.quantity to item.totalPrice.
export const getCartTotalPrice = (state) =>
    state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0)

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

// but really only this one component (MenuItem).

// And so that's because of the internal optimizations

// that Redux has now,

//*================================================

//! 320. Updating Cart Quantities

//^ open: UpdateItemsQuantity  - Button - cartSlice - MenuItems

//*================================================
//! 321. Using the Cart for New Orders

//^ open: CreateOrder.jsx

//* Use the cart data to submit a new order.

//* that is easy because all we have to do is to go to that component (createOrder)

//* and then select the entire cart and then use that to submit the order,

//^^===========

//~ Handling Clear Cart Action
//* after you place an order,
//* then your cart gets automatically emptied out.

//? Explanation:
//* The clear cart action needs to be dispatched within this function.
//* However, the use of the useDispatch hook is only available in components,
//* not in regular functions like this one (async function action({ request })).
//* To work around this limitation, we'll directly import the store object here
//* and dispatch the action directly on that store.

//? Important Note:
//* Avoid overusing this technique, as it deactivates some Redux performance optimizations on this page.

//* import store from '../../store'
//* store.dispatch(clearCart())
//^=================================================

//& Title: Calculating Priority Price

//? Explanation:
//? To calculate the priority price, we need to update the UI when the user clicks the checkbox.
//? We'll use a reactive state value (withPriority) to track whether the user selects priority.
//? If priority is selected, the price should be 20% of the total cart price; otherwise, it's zero.

//* Implementation Steps:
//* 1. Set up state for priority (reactive value) =>  const [withPriority, setWithPriority] = useState(false)
//* 2. Make the checkbox a controlled element using the reactive value.
//* 3. Compute the priority price based on the selected state.
//* 4. Update the UI to reflect the priority status.

//! note:

//* after convert the input checkbox to controlled element and priority becomes a reactive boolean state
//* so it is true or false not on or off as for checkbox

;```const order = {
    ...data,
    cart: JSON.parse(data.cart),
    //! priority: data.priority === 'on',
    priority: data.priority === 'true',
}
console.log(order)```

//*===========================================================

//! 322. Redux Thunks With createAsyncThunk

//^ open:  userSlice - apiGeocoding - createOrder

//~ Implementing Geolocation with Redux Toolkit

//? Thunk Middleware for Geolocation
//* This Thunk middleware is responsible for fetching the user's address based on their geolocation.

//^ Analysis:
//* - The `fetchAddress` Thunk performs the following steps:
//*   1. Retrieves the user's geolocation position using the `getPosition` function.
//*   2. Utilizes reverse geocoding to obtain address information from the latitude and longitude.
//*   3. The goal is to display the address in a user-friendly format.

//^=======================================================================================

//& Title: Fetch User Address

//? Step 1: Get User’s Geolocation Position
//* The fetchAddress function starts by retrieving the user’s geolocation position using the getPosition function.
//* This position includes latitude and longitude coordinates.
//? Step 2: Reverse Geocoding
//* Next, we perform reverse geocoding using an API.
//* Reverse geocoding translates the GPS position into human-readable address details (e.g., city, street name).
//* We make a fetch request to the reverse geocoding API with the user’s latitude and longitude.
//* The API responds with address information related to that position.
//? Displaying Address Information
//* The resulting address string can be displayed in a form.
//* Our goal is to create a button in the order form that allows users to request their geolocation position.
//* Once the position is obtained, the address field will automatically populate with the relevant address details.
//^=============================

//& Title: Async Thunk for Fetching User Address
//? Step 1: Understanding Thunks
//* Thunks are middleware that sit between dispatching and reducers.
//* They allow us to perform actions before updating the store.
//* Redux Toolkit provides a convenient way to create Thunks.

//? Step 2: Creating the fetchAddress Thunk
//* We'll use createAsyncThunk to create our Thunk.
//* First, define the action name (e.g., 'user/fetchAddress').
//* Then, create an async function that returns a promise.
//* This function will fetch the user's geolocation position and address.

//? Step 3: Handling Thunk States in Reducers
//* Redux Toolkit generates three additional action types for Thunks:
//* - pending (while the promise is in progress)
//* - fulfilled (when the promise resolves successfully)
//* - rejected (if an error occurs)
//* We handle these states in our reducer.

//*====================================================================

//& Title: Integrating Geolocation

//? Step 1: Display Geolocation Button
//* Place the "Get Position" button above the address input field.
//* This button allows users to request their geolocation position.

//? Step 2: Submitting Form with Geolocation Data
//* When submitting the order form, include the user's GPS location.
//* This information is crucial for efficient pizza delivery.

//? Handling Geolocation Denials
//* If the user denies geolocation access or encounters issues,
//* allow manual input of the address in the form.

// Example code snippet:
// <input
//   type="hidden"
//   name="position"
//   value={
//     position.latitude && position.longitude
//       ? `${position.latitude}, ${position.longitude}`
//       : ''
//   }
// />


//*=========================================================

//! 324. Fetching Data Without Navigation: useFetcher

//^ open: Order.jsx - OrderItem.jsx

//& Title: Fetching Data Without Navigation: useFetcher

//? Introduction
//* The `useFetcher` hook allows us to fetch and mutate data without causing navigation.
//* It provides a `fetcher` object that handles fetch cancellation, prioritizes submission actions, 
//* revalidate data, manages concurrent fetches, handles errors, and supports redirection based on action/loader redirects.

//? Fetching Menu Data
//* Suppose we're working with an `Order` component. 
//* When this component mounts, we want to fetch menu data (e.g., pizza options) associated with the `/menu` route.
//! Why we want to fetch menu data when Order comp mounts?
//* so we can access to ingredients of the order meal where these ingredients located in menu data  
//* We fetch the menu data only if it doesn't exist (`!fetcher.data`) and if the fetcher is in the idle state (`fetcher.state === 'idle'`).

//? Displaying Ingredients
//* In the `OrderItem` component, we display the ingredients.
//* To avoid executing `ingredients.join(', ')` when `isLoadingIngredients` is false (even though the fetcher is still loading at the beginning),
//* we adjust the logic.
//* We pass the `isLoadingIngredients` flag to indicate whether the fetcher is currently loading ingredients.
//* The `ingredients` are retrieved from the fetched menu data using `fetcher?.data?.find((el) => el.id === item.pizzaId)?.ingredients ?? []`.


//? OrderItem:
;```<p className="text-stone text-sm capitalize italic">
    {isLoadingIngredients ? 'loading' : ingredients.join(', ')}
</p>```
//! problem: this : ingredients.join(', ')} is executed because isLoadingIngredients is false although the fetcher is still loading at the beginning
//* because in the very beginning, fetcher.state will be idle,

//! Why Idle at the Beginning?:
//* When your component first mounts, there is no ongoing fetch or submission action. 
//* Therefore, the fetcher starts in the idle state.
//* As soon as you trigger a fetch (e.g., by calling fetcher.load(href)), it transitions to the loading state,
//* indicating that data retrieval is in progress.
//* By starting in the idle state, the useFetcher hook ensures that fetches are only initiated when needed, 
//* avoiding unnecessary network requests on component mount

//~ Solution
//? Order:
;```<ul className="dive-stone-200 divide-y border-b border-t">
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
</ul>```


// Example usage:
// <ul className="dive-stone-200 divide-y border-b border-t">
//   {cart.map((item) => (
//     <OrderItem
//       item={item}
//       key={item.pizzaId}
//       isLoadingIngredients={fetcher.state === 'loading'}
//       ingredients={
//         fetcher?.data?.find((el) => el.id === item.pizzaId)?.ingredients ?? []
//       }
//     />
//   ))}
// </ul>

//& Title: Fetching Data Without Navigation: useFetcher

//? Introduction
//* In some scenarios, we need to fetch data from a different route without causing a full navigation to that route. 
//* For instance, consider a situation where we want to load menu data (such as menu items and their associated ingredients)
//* within the context of the current page (Current Order Comp) (e.g., an order form). 
//* We want to use the data from the menu route without actually navigating there (to menu route).

//? The useFetcher Hook
//* The useFetcher hook is a powerful tool for handling data fetching and mutations. It provides a fetcher object with several useful features:
//* - Data Loading: The fetcher.load() method allows us to fetch data from a specific route. for (ex. '/menu')
//* - State Management: The fetcher.state property indicates the current state of the fetcher (e.g., idle, loading, etc.).
//* - Data Storage: The fetcher.data property holds the fetched data.
//* - Error Handling: The fetcher.error property captures any errors during fetching.
//* - Redirection: The fetcher.redirectTo method allows us to redirect to a different route based on the action or loader.

//? Fetching Menu Data
// Suppose we’re working with an Order component. When this component mounts, we want to fetch menu data (e.g., pizza options) associated with the /menu route. Here’s how we can achieve this:

```useEffect(() => {
    if (!fetcher.data && fetcher.state === 'idle') {
      fetcher.load('/menu');
    }
  }, []);```
  
  // Display the ingredients for each pizza item in the OrderItem component:
 ``` <ul className="dive-stone-200 divide-y border-b border-t">
    {cart.map((item) => (
      <OrderItem
        item={item}
        key={item.pizzaId}
        isLoadingIngredients={fetcher.state === 'loading'}
        ingredients={
          fetcher?.data?.find((el) => el.id === item.pizzaId)?.ingredients ?? []
        }
      />
    ))}
  </ul>```
  
  //? Handling Initial State
  //* In the initial state (when the fetcher is idle), we return an empty array for ingredients. 
  //* This ensures that we don’t execute ingredients.join(', ') prematurely.
  
  //* By following these steps, we can effectively fetch and utilize data from another route (menu) within our current page (Order) without causing unnecessary navigation.
  
//*=========================================================

//!  325. Updating Data Without Navigation

//^ open : order  - UpdateOrder  - App - apiRestaurant


//? Introduction
//* In this section, we'll explore how to update data without triggering a new navigation. 
//* Specifically, we want to allow users to mark their order as a priority order even after it has already been placed.

//? Creating the UpdateOrder Component
//* Let's create an UpdateOrder component to handle data updates. 
//* We'll focus on changing the priority status from false to true.

//? Updating Data Using useFetcher
//* We'll utilize the useFetcher hook to manage data updates. 
//* Instead of fetcher.load, we'll use a form component provided by the fetcher (fetcher.Form)

//? Example:
//* When the "Make Priority" button is clicked, we'll update the priority status. 
//* The page will re-render, hiding the button and displaying the updated priority status.

//? Implementation Steps:
//* 1. Create the UpdateOrder component.
//* 2. Wrap the "Make Priority" button in a form (even without input elements) to trigger the update.

//* By following these steps, we can seamlessly update data without causing unnecessary navigations.


//^======================

//& Title: React Router Form Navigation
//? The form (fetcher.Form) in UpdateOrder comp is similar to the one we worked with earlier in the CreateOrder component. 
//* The key difference is that submitting this previous form in CreateOrder comp actually creates new navigation,
//* whereas the this form (fetcher.Form in updateOrder component) does not navigate away;
//* it simply submits the form and revalidates the page.

//^==============
//? open: updateOrder
//? Let's write the actual logic to update the order
//* We need an action for this purpose. 
//* Create an async function called "action" that receives access to the request and params.

//^==============
//? To wire everything up in our route definition (in App.jsx), we need to connect this action with the page.
//* In App.js, where we define our routes, import the updateOrderAction from './features/order/UpdateOrder'. 
//* Then, connect it to the route for '/order/:orderId' as follows:
// {
//     path: '/order/:orderId',
//     element: <Order />,
//     loader: orderLoader,
//     errorElement: <Error />,
//     action: updateOrderAction,
// }

//^==============
//! why request parameter in action function in UpdateOrder comp is not used this time?
//? reason
//* Usually, when handling data updates, we have input fields in the form. However, in this case, we only have a button.
//* Unlike the CreateOrder component, we don't need to read any data from the request here.


```
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
} ```

//& Title: Updating Order Priority
//? Updates an order's priority status using the `updateOrder` function.

//* To update an order's priority, we use the `updateOrder` function from our `apiRestaurant` service.
//* This function performs a PATCH request, sending only the changed data.
//* We provide the order ID and set the priority field to `true`.
//* The button for this action is visible when the priority is `false`.
//* Re-validation ensures the page reflects the updated data.
//* Similar techniques can be used for other interactive features.

//*=========================================================
