import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useCloseOutside } from "../hooks/useCloseOutside";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;
//? 1) Create context (ModalContext)
const ModalContext = createContext();

//? 2) Create Parent Component (Modal):
//* Parent Component is the modal itself and it needs to accept children
//* so that then it can display the Windows and the Opens.

function Modal({ children }) {
  console.log("hello modal");

  //* write the states
  const [openName, setOpenName] = useState("");
  //* then write the (state updating functions) handle functions
  const close = () => setOpenName("");
  const open = setOpenName;

  //? use the context here to provide the states and setStates to all our child components
  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

//* 3) Create Child Components to help implementing the common task of this overall compound component
//* which are (open Task and render Window Task)
function Open({ children, opens: opensWindowName }) {
  //* in the Open component, we will need access to the open function from the context.
  //* So useContext with ModalContext.

  const { open } = useContext(ModalContext);

  // return children; //* (to pass the Button)

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

//* we removed onClose props from the Window, not needed anymore
//* instead we use our internal close function the one we got from the context.

function Window({ children, name }) {
  // console.log("hello window");
  const { openName, close } = useContext(ModalContext);

  //~====================================================

  //? Trans all down to CustomHook (useCloseOutsideHook)
  // const ref = useRef();
  // if (name !== openName) return null;

  //! useEffect is called conditionally if (if (name !== openName) return null;)
  //! at the top so move it down

  //useEffect(
  //   function () {
  //     function handleClick(e) {
  //       //* ref.current is the white modal window
  //       if (ref.current && !ref.current.contains(e.target)) {
  //         console.log("Click outside");
  //         close();
  // which is basically where the DOM node
  // that references this element (StyledModal) here will be stored
  //       }
  //     }
  //     document.addEventListener("click", handleClick, true);
  //     //* remove the event when the component unmount
  //     return () => document.removeEventListener("click", handleClick, true);
  //   },
  //   [close]
  // );;

  //~====================================================

  const ref = useCloseOutside(close);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>

        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
    //? or can be any:
    //* document.querySelector()
  );
}
//* 4) Add child components as properties to parent component
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
