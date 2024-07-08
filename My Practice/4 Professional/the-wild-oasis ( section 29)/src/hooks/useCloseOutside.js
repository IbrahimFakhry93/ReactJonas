import { useEffect, useRef } from "react";

export function useCloseOutside(handler, listenCapturing = true) {
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        //* ref.current is the white modal window
        if (ref.current && !ref.current.contains(e.target)) {
          console.log("Click outside");
          handler();
          // which is basically where the DOM node
          // that references this element (StyledModal) here will be stored
        }
      }
      document.addEventListener("click", handleClick, true);
      //* remove the event when the component unmount
      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return ref;
}

//& Title: Creating a Custom Hook for Handling Clicks Outside

//? Steps to Create the Custom Hook:
//! 1. Identify the Logic to Extract:
//    - Look at the existing logic related to handling clicks outside the modal.
//    - In your case, it's the event listener for clicks and the check to see if the click occurred outside the modal.

//! 2. Create a New File for Your Custom Hook:
//    - Start by creating a new file (e.g., useCloseOutsideHook.js) where you'll define your custom hook.

//! 3. Define the Custom Hook Function:
//    - Inside useCloseOutsideHook.js, create a function (e.g., useCloseOutside) that encapsulates the logic.
//    - This function should take parameters (such as the modal reference and the close function) and return any necessary values (if applicable).

//! 4. Move the Existing Logic into the Custom Hook:
//    - Copy the event listener logic (e.g., the handleClick function) from your original component into the custom hook.
//    - You can also move the useEffect code that adds and removes the event listener.

//! 5. Return Values from the Custom Hook:
//    - Decide what values your custom hook should return.
//    - Common options include:
//      - A function to handle clicks outside (e.g., handleClickOutside).
//      - Any other relevant state or values (e.g., whether the modal is currently open).

//! 6. Use the Custom Hook in Your Component:
//    - Import your custom hook function into your component (e.g., import useCloseOutside from './useCloseOutsideHook').
//    - Call the hook inside your component, passing in the necessary parameters (e.g., the modal reference and the close function).
//    - Use the returned values (if any) in your component.

//! 7. Clean Up:
//    - If your custom hook sets up any subscriptions (like the event listener), make sure to clean up when the component unmounts.
//    - Return a cleanup function from your custom hook (similar to how you did with document.removeEventListener).

// 8. Test Your Custom Hook:
//    - Verify that your custom hook works correctly by using it in your component.
//    - Test different scenarios (e.g., opening and closing the modal, clicking inside and outside the modal).
