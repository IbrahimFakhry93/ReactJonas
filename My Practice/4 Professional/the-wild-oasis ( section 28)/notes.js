//! 367. Building a Modal Window Using a React Portal

//* Build a simple modal window component using React's portal feature
//* then convert this modal to reusable compound component in next video.

//* we actually want the form to add a new cabin to appear in a modal window.
//* we want a new window to open on top of the table.

//^ open: Modal.jsx

//^ create: AddCabin.jsx inside Cabins folder

//^ open: Cabins v-1.jsx  Cabins.jsx  in Pages folder

// but let's move all this logic =(which toggle the form render) to a separate component (AddCabin)

// because as we said initially we want all of these pages here to be as simple as possible.

// So we don't want them to have any state or any effects.

//^=============================================

//* We will allow this modal window to receive some custom content.
//* And that content is going to be the CreateCabinForm.

//*==========================================================================

//? Closing the modal:

//^ open: CreateCabinForm

//* onClick={()=> onCloseModal?.()}

//* Conditionally calling onCloseModal function by optional chaining in case the form is used in a place that there is no modal

// if onCloseModal is undefined then the function will not get called

// because of this optional chaining operator.

//? Conditionally style the form depends on Modal existence or not:

//^ open: Form.jsx

const Form = styled.form`
  ${(props) =>
    // props.type !== "modal" &&

    //? or: (better) and add defaultProps

    props.type === "regular" &&
    css`
      padding: 2.4rem 4rem;
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 80rem;
    `}
`;

Form.defaultProps = {
  type: "regular",
};
export default Form;
//*=============================================

//? Using React Portal:

// React Portal is part of React DOM, which actually makes sense
// because this really is about placing some JSX in the DOM.

//* return createPortal(1stArg, 2ndArg)

// then this function here receives as the first argument

// the JSX that we want to render.

// And then as the second argument,

// a DOM note where we want to render this JSX.

//!  document.body
// notice how the modal window (check the browser inspect)

// is actually a direct child element of the body element.

// And so that's because we selected that body right here.

// And so the reason for that

// is that here we selected that body element

// to be the parent element of whatever we want to render.

// And so this modal now essentially lives completely outside

// of the DOM structure of the application itself,

// which lives right here inside this root div.

// while modal  inside the component tree (check react dev tools)

// the modal is still at the exact same place.

// And so that's why we can still pass all the props into it

//? reason of using ReactPortal:

// But now you might be wondering,

// this worked really great already in the beginning

// with just regular CSS positioning, so without the portal.

// And so why do we even need to use this portal?

// Well, the main reason why a portal becomes necessary

// is in order to avoid conflicts

// with the CSS property overflow set to hidden.

// So many times we build a component like a modal

// and it works just fine,

// but then some other developer will reuse it somewhere else

// and that somewhere else might be a place

// where the modal will get cut off

// by a overflow hidden set on the parent.

// So this is basically all about reusability

// and making sure that the component will never be cut off

// by an overflow property set to hidden

// on some parent element.

// So in order to avoid this kind of situation

// we simply render the modal completely outside

// of the rest of the DOM.

// So basically on top of the DOM tree as we just did here.

// All right, so hopefully this made sense.

// And with this, we finished our first version of the modal.

// However, this modal does contain a few problems

// and most importantly, the way in which we open the modal.

// And so that's why in the next lecture

// we will actually convert this to a compound component.

//^ open: Modal.jsx

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
