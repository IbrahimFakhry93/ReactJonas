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

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;
function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
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

//& Title: Understanding CSS max-width and rem units
//? max-width in CSS:
//* - It's a property that sets the maximum width of an element.
//* - It prevents the element from stretching wider than the specified value.
//* - In your code, `max-width: 120rem;` means the maximum width of the `Container` element is 120 times the root element's font size.

//? rem unit in CSS:
//* - The `rem` unit stands for "root em". It's a relative unit in CSS.
//* - It's calculated relative to the root element (usually the `<html>` element).
//* - If the root element's font size is the browser's default (usually 16px), then `1rem` equals `16px`.
//* - So, `120rem` would be equivalent to `1920px` (120 * 16).

//? Note:
//* - The `max-width: 120rem;` declaration impacts the layout by ensuring that the `Container` element doesn't stretch wider than `120rem` or `1920px`.
//* - This can be particularly useful for maintaining layout integrity on larger screens.
//* - When you change the browser screen size, if the viewport is wider than `120rem` (or `1920px`), the `Container` will not stretch beyond `120rem`, but will stay centered due to the `margin: 0 auto;` rule. The rest of the viewport width will be empty space.
//* - If the viewport is narrower than `120rem`, the `Container` will adjust its width to fit the viewport because it's a flex container.
//*  The `max-width` rule only sets a limit on how wide the element can get, not how narrow.
