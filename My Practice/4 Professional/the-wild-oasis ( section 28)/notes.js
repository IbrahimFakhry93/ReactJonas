//* check Compound Components section 28

//! 367. Building a Modal Window Using a React Portal

//* Build a simple modal window component using React's portal feature
//* then convert this modal to reusable compound component in next video.

//* we actually want the form to add a new cabin to appear in a modal window.
//* we want a new window to open on top of the table.

//^ open: Modal v-1.jsx

//^ create: AddCabin v-1.jsx inside Cabins folder

//^ open: Cabins v-1.jsx and Cabins.jsx  in Pages folder

//* let's move all this logic from Cabins v-1.jsx  (which is toggle the form render:
//* the open state, toggle button, conditional rendering of <CreateCabinForm /> )
//* to a separate component (AddCabin v-1.jsx)

//* because as we said initially we want all of these pages (Cabins) here to be as simple as possible.
//* So we don't want them to have any state or any effects.

//^=============================================

//* We will allow this modal window to receive some custom content.
//* And that content is going to be the CreateCabinForm.

//*==========================================================================

//? Closing the modal:

//^ open: CreateCabinForm

//* onClick={()=> onCloseModal?.()}

//* Conditionally calling onCloseModal function by optional chaining in case the form is used in a place that there is no modal
//* if onCloseModal is undefined then the function will not get called because of this optional chaining operator.

//? Conditionally style the form depends on Modal existence or not:

//^ open: Form.jsx

// const Form = styled.form`
//   ${(props) =>
// props.type !== "modal" &&

//     //* or: (better) and add defaultProps

//*     props.type === "regular" &&
//     css`
//       padding: 2.4rem 4rem;
//     `}

//   ${(props) =>
//     props.type === "modal" &&
//     css`
//       width: 80rem;
//     `}
// `;

//* Form.defaultProps = {
//*   type: "regular",
// };
// export default Form;
//*=============================================

//? Using React Portal:

//^ open: Modal v-1.jsx

//? What is a React portal?
//* A React portal is a feature that allows us to render an element outside of the parent component's
//* DOM structure while still keeping the element in the original position of the component tree.

//? How does it work?
//* With a portal, we can render a component in any place we want inside the DOM tree.
//* However, the component remains at the same place in the React component tree.
//* This means that things like props continue to work normally.

//? Use cases for portals:
//* Modal windows: Render modals outside the main content area.
//* Tooltips: Display tooltips in a specific position relative to an element.
//* Menus: Render dropdown menus outside their parent components.

//* React Portal is part of React DOM, which actually makes sense
//* because this really is about placing some JSX in the DOM.

//* return createPortal(1stArg, 2ndArg)

//* this function here receives as the first argument the JSX that we want to render.
//* And then as the second argument, a DOM note where we want to render this JSX.

//! check Modal function in Modal file
//* after passing document.body notice how the modal window (check the browser inspect)
//* is actually a direct child element of the body element.

//* And so that's because we selected that body right here(document.body)
//* And so the reason for that is that here we selected that body element
//* to be the parent element of whatever we want to render.
//* And so this modal now essentially lives completely outside
//* of the DOM structure of the application itself,
//* which lives right here inside this root div.
//* while modal inside the component tree (check react dev tools)
//* the modal is still at the exact same place.
//* And so that's why we can still pass all the props into it

//? reason of using ReactPortal:

//& Title: Understanding React Portals

//? Why Use React Portals?
//* - Portals allow us to render an element outside of the parent component's DOM structure.
//* - This is useful when we want an element to appear in a different position in the DOM tree
//*   while maintaining its position in the React component tree.
//* - The primary reason for using portals is to avoid conflicts with the CSS property `overflow` set to `hidden`.

//? The Overflow Hidden Problem:
//* - Imagine building a modal component that works well in one context.
//* - Another developer reuses this modal elsewhere,
//*   but that new location has a parent element with `overflow: hidden`.
//* - As a result, the modal gets cut off because it's within the hidden overflow area.
//* - Portals help us avoid this situation by rendering the modal outside the rest of the DOM.

//? How Portals Solve the Issue:
//* - By rendering the modal on top of the DOM tree (outside the parent with hidden overflow), we ensure it won't be cut off.
//* - This enhances reusability and prevents unexpected behavior due to CSS constraints.

//? Next Steps:
//* - Although we've created our first version of the modal, there are still some issues to address.
//* - Specifically, we'll improve the way we open the modal.
//* - In the next lecture, we'll convert our modal to a compound component for better flexibility and control.

//*===========================================================================================================

//! 368. Converting the Modal to a Compound Component
//& Title: Converting to a Compound Component

//? Why Convert to a Compound Component?
//* - The initial modal we built has limitations in state management and rendering.
//* - We want to avoid making the component which uses the modal (AddCabin), will be responsible for tracking modal state.
//* - The AddCabin component shouldn't manage whether the modal is open or closed.

//? Solution: Compound Component
//* - We'll convert the modal into a compound component.
//* - Each part of the modal (e.g., content, buttons) will be separate components.
//* that we actually want to display inside the modal.
//* So basically we want some button to open the modal, and we want the window itself.
//* So these two components together should form the Modal component (Button and Window)

//? the modal component.
//* - The modal itself will internally manage its open/closed state.
//* it should keep this state internally. So Modal should track the state in an encapsulated manner
//* inside the component.

//! The Modal Compound Component should do this:
//* 1) Keep track of the open state.
//* 2) Gives us a way to pass in the content.

//? Example usage:
//* (Note: This is a simplified example; actual implementation may vary.)

//^ Modal.js (Compound Component Bing AI Example)
```import React, { useState } from 'react';

const Modal = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      {/* Trigger button */}
      <button onClick={openModal}>Open Modal</button>

      {/* Render modal content */}
      {isOpen && (
        <div className="modal">
          {children}
          <button onClick={closeModal}>Close</button>
        </div>
      )}
    </>
  );
};

export default Modal;

// In the main component:
import React from 'react';
import Modal from './Modal';

const App = () => {
  return (
    <div>
      {/* Main content */}
      <h1>Hello, World!</h1>

      {/* Use the modal */}
      <Modal>
        <p>This is the modal content.</p>
      </Modal>
    </div>
  );
};

export default App;```;

//^ Duplicate AddCabin to: AddCabin v-1.jsx and work in AddCabin.jsx

//? Redeclare AddCabin Component:
//* Create the API of this component (look at AddCabin Component)
//* Modal Compound Components will allow us to create multiple windows
//* However, only one of them ( <Modal.Open opens="table"> ,   <Modal.Open opens="cabin-form"> )
//* can be open at the same time.
//* And so therefore each of these buttons needs to know which window it should actually open.
//* And so therefore here, let's pass an prop called opens.
//^=============================================
//* we need to give each window a name.
//* And then we associate each open component (Modal.Open) to that name now.
//* opens value === name value

//^ Duplicate Modal to: Modal v-1.jsx and work in Modal v-2.jsx

//* A way to add modal open event handler to Button in AddCabin
//* So use cloneElement Function inside Modal v-2

//* this technique can still be pretty useful because the clone elements
//* basically allows us
//* to create a new React element based on another one.
//* So we in the element, and then we can pass in props,
//* which will solve our problem here in our case.

//^ look at the window function
//* In the window we basically need to check which is the currently open window.
//* And if it's the same as this name here i Modal.Open (opens="cabin-form" )

//* if (name !== openName) return null;

//* else it will render:

// return createPortal(
//   <Overlay>
//     <StyledModal>
//       <Button onClick={onClose}>
//         <HiXMark />
//       </Button>
//       <div>{children}</div>
//     </StyledModal>
//   </Overlay>,
//   document.body
//   //? or can be any:
//   //* document.querySelector()
// );

//? Going off styling of the Modal:

//! reason:

//* Because in CreateCabinForm.jsx, we passed (onCloseModal)
//* to CreateCabinForm function to apply a modal styling
//* but here in new Modal compound component (Modal.jsx)
//* we didn't do so.
//* So we use cloneElement Function technique to pass onCloseModal
//*===========================================================================================================

//! 369. Detecting a Click Outside the Modal

//* to detect a click that happens outside the modal window,
//* and so when that happens, we then want to close the window.

//^ open: Modal v-2.jsx

//* use useEffect hook to do some primitive DOM manipulation

//* Requirement of this click detection:

// we want something to happen whenever we click outside here.

// So basically, whenever the click event

// that we are handling here happens outside

// of this element right here, so outside of this StyledModal,

// so let's then manually select this element using a ref.

```useEffect(
  function () {
    function handleClick(e) {

      //* ref.current is the white modal window
      if (ref.current && !ref.current.contains(e.target)) {
        console.log('Click outside')
        close();
      // which is basically where the DOM node
      // that references this element (StyledModal) here will be stored
    }

    document.addEventListener("click", handleClick);
    //* remove the event when the component unmount
    return () => document.removeEventListener("click", handleClick);
  }},
  [close]
);```;

//=======================================
//? Bubbling Events Problem:
//^ open: useCloseOutside.js
//* After close the modal by click outside
//* when you click again on the add new cabin
//* we get in the console: Click outside

//! So add true to handle the event in capturing phase not in bubbling phase.
// document.addEventListener("click", handleClick, true);
// //* remove the event when the component unmount
// return () => document.removeEventListener("click", handleClick, true);

//? Practice turn the useEffect to custom hook
//* what do we need inside this custom hook from the outside?
//* pass close function and call it inside the custom hook as handler
//* so it will be generic

// maybe to make this even a bit more flexible,

// let us here allow the user to specify

// whether they want to listen for the event

// in the bubbling or in the capturing phase.

// So let's call this one listenCapturing,

// and by default, let's set it to true,

//*===========================================================================================================

//! 370. Confirming Cabin Edit and Deletions

//^ Duplicate CabinRow to CabinRow v-3 and open CabinRow

//? Edit:

// <Modal.Open>
// <button onClick={() => setShowForm((show) => !show)}>
//   <HiPencil />
// </button>
// </Modal.Open>
// <Modal.Window>
// <CreateCabinForm cabinToEdit={cabin} />
// </Modal.Window>

//? Delete:

//* We want a confirmation message before delete a cabin.

//^ open ConfirmDelete.jsx in UI Folder

//* cancel button is essentially for closing the modal
//* so since confirmDelete is a child of the Modal
//* so it'll automatically receive the onClose modal prop

//! because of this: look inside createPortal in Modal
{
  /* <div>{cloneElement(children, { onCloseModal: close })}</div> */
}
//* so children here is ConfirmDelete

//*===========================================================================================================

//! 371. Building a Reusable Table
//^ Duplicate CabinTable to CabinTable v-2
//^ open: CabinRow.jsx - CabinTable.jsx

//* check: grid-template-columns

//& Title: Reusable Table Component
//? Problem: Hardcoded columns in CabinRow.jsx and CabinTable.jsx
//* Solution: Create a compound component for dynamic column definitions

//& Subtitle: The Issue
//? Issue: Columns are hardcoded in multiple places (CabinRow.jsx and CabinTable.jsx).
//* Explanation: This approach makes it challenging to reuse the table for other purposes (e.g., bookings).

//& Subtitle: Desired Approach
//? Approach: Pass column definitions dynamically
//* Explanation: Instead of hardcoding columns, we want to pass column definitions into the table component. This way, the header and rows can automatically adjust to column sizes.

//& Subtitle: Compound Component Solution
//? Solution: Use a compound component
//* Explanation: We can create a compound component that allows users to define columns and customize their behavior.
//* Example:
//   <Table>
//     <Table.Header>
//       <Table.Column label="Name" accessor="name" />
//       <Table.Column label="Age" accessor="age" />
//       {/* ... More columns */}
//     </Table.Header>
//     <Table.Rows>
//       {/* Rows with data */}
//     </Table.Rows>
//   </Table>

//! Table.Footer = Footer;
// Footer is just the styled component
// because we don't need to add any logic to it
// So the footer has no columns.

//! Header and Row:
//* So the ones that do have columns is the header and the row,
//* and so now we need to give these two components here access to these columns,
//* since we are using a compound component, so we will achieve this by creating table context

//! Styled Table give some base styles
//*===========================================================================================================

//! 372. Applying the Render Props Pattern

//* A small use case of the render props pattern to implement our tables body.

//* we also need to pass in basically the instructions

// on how this table.body should actually render the data.

// And so that's where the render prop pattern comes into play,  by render prop,
