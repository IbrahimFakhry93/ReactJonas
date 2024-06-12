import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr; //* auto means first row wil have the size of content itself, 1fr means the rest of rows will occupy the rest of the page
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;

// let's place this outlet

// inside like, a main component.

// And so, the reason for that is that then,

// we can have all these pages, basically with the same style.

// Because later we will style this element here,

// and then, whatever content is gonna come here

// from the pages, so which is going to be this,

// will simply be placed all inside the main.
