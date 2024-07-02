//! 363. Setting Up an Example

//? Custom hook sometimes is not enough to achieve reusable component:

//  We wouldn't get any of a JSX
//  or other two button: toggle open /close button , toggle collapse button
//  Also the logic here of conditional rendering as down:

```{isOpen && (
    <ul className="list">
      {displayItems.map((product) => (
        <ProductItem key={product.productName} product={product} />
      ))}
    </ul>
  )}```;

//* Here both the logic and the UI that we have created here
//* for both of these lists, product lists and company list.
//* So essentially what we want is to just
//* reuse this component (List) which contains all the logic and UI that we want to share.

//^ look at function App
```<List>
{/* We can't access displayItems  so we can't apply the composition and use children prop*/}
{/* {displayItems.map((product) => (
  <ProductItem key={product.productName} product={product} />
))} */}
</List>```;

//! Note: the children prop is really not an option
//! because it is quite limited in the fact that it only
//! allows us to really pass in some content.

//* But here, what we need is not to only pass the content in,
//* but also pass in the instructions on how the items should be rendered.
//* that's where the render props pattern comes into play.

//*========================================================================================================

//! 364. The Render Props Pattern

//* the render prop pattern is all about passing in a prop called render,
//* which is a function that a component uses to know what it should render
//* and how to do it.
//* So whenever you can't directly pass in JSX with the children prop
//* because you need to give the component a description on how to render something,
//* then you need to reach for this render props pattern.

//^ look at App function:
//* Pass render function as a prop to List Component
//* <List title="Products" items={products}  render ={} />

//* This function will be the instructions of how to render something.

//? The Instruction in our case
//* For each product we want to render productItem comp
```{displayItems.map((product) => (
    <ProductItem key={product.productName} product={product}  />
  ))}```;

//? So cut the callback arrow function
//* (product) => <ProductItem key={product.productName} product={product} />;

```<List
            title="Products"
            items={products}
            render={(product) => (
            <ProductItem key={product.productName} product={product} />
            )}
/>```;

//^ look at List component:
//* Receive the render prop in List function.

//! function List({ title, items, render }) {
//     //* Stateful logic
//     //* Logic for collapsing
//     const [isOpen, setIsOpen] = useState(true);
//     const [isCollapsed, setIsCollapsed] = useState(false);

//     const displayItems = isCollapsed ? items.slice(0, 3) : items;

//     function toggleOpen() {
//       setIsOpen((isOpen) => !isOpen);
//       setIsCollapsed(false);
//     }

//     return (
//       <div className="list-container">
//         <div className="heading">
//           <h2>{title}</h2>
//           <button onClick={toggleOpen}>
//             {isOpen ? <span>&or;</span> : <span>&and;</span>}
//           </button>
//         </div>
//!         {isOpen && <ul className="list">{displayItems.map(render)}</ul>}

//         <button onClick={() => setIsCollapsed((isCollapsed) => !isCollapsed)}>
//           {isCollapsed ? `Show all ${items.length}` : "Show less"}
//         </button>
//       </div>
//     );
//   }

//? Inversion of Control:

//* So now our list works exactly the same way as before
//* but we basically inverted the control of how
//* it should render to the user of the component.
//* So this is what we call inversion of control
//* and it's an important principle
//* in software development in general.

//* This list component no longer knows actually what it is rendering
//* It has no idea what will happen here inside the map function for each of the display items.
//* All that it knows is that it received this function (render) and that it will call this function
//* for each items in the array.

//* And so this component (list) doesn't know anymore what it is actually rendering,
//* it then makes that very easy to reuse the component for other render props

//*==================================================================================================

//! 365. A Look at Higher-Order Components (HOC)

//* Almost no one still writes Higher Order Components by hand,
//* but I'm still gonna show you this because some libraries,
//* do actually expose Higher Order Components,
//* and then it's gonna be very useful to know what they are.
//* So you don't need to know how to write them

//* In this lecture, I will quickly show you a Higher Order Component,
//* what it is, and how it works and also why it would be used.

//* one way would be to write a Higher Order Component
//* to basically enhance or improve this component right here.
//* So, a Higher Order Component is simply a component
//* that takes in another component
//* and then returns a new component that is better,
//* so an enhanced version of the initial component.

//^ Look at ProductList in App.jsx
//! LATER: Let's say we got this component from a 3rd-party library,
//* and can't change it. But we still want to add the 2 toggle functionalities to it
//* toggle open /close button , toggle collapse button
// function ProductList({ title, items }) {
//   return (
//     <ul className="list">
//       {items.map((product) => (
//         <ProductItem key={product.productName} product={product} />
//       ))}
//     </ul>
//   );
// }
//^ open: HOC.js
//* That component is this one called (withToggles) because it will basically add back
//* to our component (ProductList) which is is the wrapped component that we can pass in.

//^==========================================================================================

//* So it's pretty common that a Higher Order Component
//* is called something that starts with this (with) keyword,
//* because basically it will add these toggles
//* to the component that we pass in.

//* And so then we have a new component with toggles,
//* So again, the way in which we write a Higher Order Component
//* is not that important.
//* What matters is that it's usually called something
//* that starts with (with) keyword and that it takes wrapped component
//* and returns a new one (Enhanced one: ex. List)
//* And the new one adds some functionality to that passing component.
//* So it's then returned here,

//*=====================================================================================

//! 366. The Compound Component Pattern
