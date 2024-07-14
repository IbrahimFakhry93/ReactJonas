import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useCloseOutside } from "../hooks/useCloseOutside";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

//* 1) Create Context
const MenusContext = createContext();

//* 2) Create Parent Component
function Menus({ children }) {
  //* use state to keep track which cabin is currently openID
  const [openId, setOpenId] = useState(""); //* here startoff with empty string, which means none of the menus is currently opened
  const [position, setPosition] = useState(null);

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

//* 3) Create Child Components
function Toggle({ id }) {
  const { openId, close, open, setPosition } = useContext(MenusContext);
  //! handleClick
  function handleClick(e) {
    const rect = e.target.closest("button").getBoundingClientRect();
    console.log(rect);
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });
    //* if the openId is empty, meaning that there is no ID, (none of menus is opened)
    //* or if the openId (the currently open menu) is different
    //* from the (id) of this exact button that is being clicked,
    //* then let's open the menu.
    //* And we do this (open the menu) by passing in the ID of exactly this button
    //* because this button is connected to that menu by this ID.

    openId === "" || openId !== id ? open(id) : close();

    //* id: is the id of the clicked button
  }
  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}
function List({ id, children }) {
  //* we will need the openId from MenuContext,
  //* because we need to compare that openId with the id of this list,
  //* so like the modal window where we compared the window name
  //* with the currently opened name.
  //* And so here we now have to do exactly the same thing.
  const { openId, position, close } = useContext(MenusContext);
  const ref = useCloseOutside(close); //* by default is in capturing phase

  if (openId !== id) return null;

  //* if the id of the list matches the one that is currently open, then we want to render something.
  //* render a list of buttons

  //? Use createPortal:
  //* use create portal because this element will also float
  //* on top of the UI. And so in cases like that,
  //* it's always a good idea to use a portal.
  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );

  //? Children for the list are the buttons look at CabinRow.jsx
} //* List will unOrderList

//* Button is an orderedList (li) inside List
function Button({ children, icon, onClick }) {
  function handleClick() {
    onClick?.(); //* use Optional chaining to conditionally call onClick function
    close(); //* close the list after any click
  }
  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
